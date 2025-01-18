// /api/pretransaction/route.ts
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

interface PaymentRequestBody {
  amount: number;
  product: string | object;
  firstname: string;
  email: string;
  mobile: string;
}

export async function POST(req: NextRequest) {
  try {
    const payu_key = process.env.PAYU_KEY!;
    const payu_salt = process.env.PAYU_SALT!;

    const { amount, product, firstname, email, mobile } = (await req.json()) as PaymentRequestBody;

    // Validate required fields
    if (!amount || !product || !firstname || !email || !mobile) {
      console.error("Missing required fields", { amount, product, firstname, email, mobile });
      return NextResponse.json({ msg: "Missing required fields" }, { status: 400 });
    }

    const txn_id = "PAYU_MONEY_" + uuidv4();
    
    // Ensure product info is properly stringified
    const productinfo = typeof product === 'string' ? product : JSON.stringify(product);

    // Initialize empty UDF fields
    const udf1 = "";
    const udf2 = "";
    const udf3 = "";
    const udf4 = "";
    const udf5 = "";

    // Create hash string
    const hashString = `${payu_key}|${txn_id}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${payu_salt}`;
    
    // Calculate hash using SHA512
    const hash = crypto.createHash('sha512')
                      .update(hashString)
                      .digest('hex');

    const redirectUrl = "https://test.payu.in/_payment";
    
    const formData = {
      key: payu_key,
      txnid: txn_id,
      amount: amount.toString(),
      productinfo: productinfo,
      firstname,
      email,
      phone: mobile,
      surl: `${process.env.NEXT_PUBLIC_HOST}/api/verify/${txn_id}`,
      furl: `${process.env.NEXT_PUBLIC_HOST}/api/verify/${txn_id}`,
      hash,
      udf1,
      udf2,
      udf3,
      udf4,
      udf5
    };

    // Return the form data and redirect URL
    return NextResponse.json({ formData, redirectUrl });

  } catch (error: any) {
    console.error("Payment Initiation Error: ", error);
    return NextResponse.json({ msg: error.message }, { status: 400 });
  }
}