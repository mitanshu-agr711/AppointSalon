'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  const [self, setSelf] = useState(null);
  const [onCheckOpen, setOnCheckOpen] = useState(false);
  const [reshash, setReshash] = useState(null);

  const amount = 250; // Update amount
  const contact = 1234567890; // Update contact number
  const url = process.env.NEXT_PUBLIC_API_URL; // Use NEXT_PUBLIC_ prefix for public environment variables

  const data = {
    txnid: 'TXN_' + new Date().getTime(), // Unique transaction ID
    amount: amount.toFixed(2),
    productinfo: 'Sample Product',
    firstname: 'John',
    email: 'john.doe@example.com',
  };

  useEffect(() => {
    if (onCheckOpen) {
      makePayment();
    }
  }, [onCheckOpen]);

  const makePayment = async () => {
    await paymentReq();
    await responseReq();
  };

  const paymentReq = async () => {
    try {
      const response = await axios.post(
        `${url}api/payment`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setReshash(response?.data?.hash);
    } catch (error) {
      console.error('Payment Error', error);
    }
  };

  const responseReq = async () => {
    const pd = {
      key: process.env.PAYU_KEY,
      txnid: data.txnid,
      amount: data.amount,
      firstname: data.firstname,
      email: data.email,
      phone: contact,
      productinfo: data.productinfo,
      surl: `${url}api/pretransaction`,
      furl: `${url}api/failure`,
      hash: reshash,
      service_provider: 'payu_paisa',
    };

    try {
      const response = await axios.post(
        `${url}api/pretransaction`,
        JSON.stringify(pd),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setSelf(response?.data);
    } catch (error) {
      console.error('Response Error', error);
    }
  };

  const handleCheckClose = () => setOnCheckOpen(false);
  const handleCheckOpen = () => setOnCheckOpen(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        className="px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={handleCheckOpen}
      >
        Proceed to Pay
      </button>

      {onCheckOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <a
              href={self || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              You&apos;ll be redirected to PayU payment Gateway
            </a>
            <button
              className="mt-4 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleCheckClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;
