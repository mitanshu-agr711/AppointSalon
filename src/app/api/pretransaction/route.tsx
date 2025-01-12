import crypto from 'crypto';
import { NextResponse } from 'next/server';

const generateHash = (data, key) => {
  return crypto.createHash('sha512').update(data + key).digest('hex');
};

export async function POST(req:Request) {
  try {
    const body = await req.json();

    // Validate mandatory fields
    const { txnid, amount, productinfo, firstname, email, phone } = body;
    if (!txnid || !amount || !productinfo || !firstname || !email || !phone) {
      return NextResponse.json({ error: 'Mandatory fields are missing' }, { status: 400 });
    }

    // Environment variables for PayU
    const PAYU_KEY = process.env.PAYU_KEY;
    const PAYU_SALT = process.env.PAYU_SALT;
    const PAYU_BASE_URL = process.env.PAYU_BASE_URL; // Sandbox URL: https://sandboxsecure.payu.in/_payment

    if (!PAYU_KEY || !PAYU_SALT || !PAYU_BASE_URL) {
      throw new Error('PayU environment variables are not set correctly.');
    }

    // Generate hash for PayU
    const hashString = `${PAYU_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_SALT}`;
    const hash = generateHash(hashString, '');

    // Payment parameters
    const paymentData = {
      key: PAYU_KEY,
      txnid: txnid,
      amount: amount,
      productinfo: productinfo,
      firstname: firstname,
      email: email,
      phone: phone,
      surl: `${process.env.NEXT_PUBLIC_URL}/api/payu/verify`, // Success callback URL
      furl: `${process.env.NEXT_PUBLIC_URL}/api/payu/verify`, // Failure callback URL
      hash: hash,
    };

    return NextResponse.json({ action: PAYU_BASE_URL, params: paymentData }, { status: 200 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: 'Transaction initiation failed', details: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.formData();

    // Extract response data
    const {
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      status,
      hash,
      key,
    } = Object.fromEntries(body);

    // Validate response data
    if (!txnid || !status || !hash) {
      return NextResponse.json({ error: 'Mandatory fields are missing in the callback' }, { status: 400 });
    }

    const PAYU_SALT = process.env.PAYU_SALT;

    // Recreate hash to verify response integrity
    const hashSequence = `${PAYU_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    const calculatedHash = generateHash(hashSequence, '');

    if (calculatedHash !== hash) {
      return NextResponse.json({ error: 'Invalid hash. Possible tampering detected.' }, { status: 403 });
    }

    if (status === 'success') {
      // Process successful payment (e.g., save to database)
      console.log('Payment Success:', { txnid, amount, productinfo, firstname, email });

      return NextResponse.json({
        status: 'success',
        message: 'Payment was successful.',
        transaction_id: txnid,
      });
    } else {
      return NextResponse.json({ status: 'failure', message: 'Payment failed.' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: 'Verification failed', details: error.message }, { status: 500 });
  }
}
