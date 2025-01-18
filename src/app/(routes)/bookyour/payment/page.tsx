'use client';
import axios from 'axios';
import { useState } from 'react';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const initiatePayment = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const totalPrice = 100;
      const paymentData = {
        amount: totalPrice,
        product: { 
          title: "Total Order",
          price: totalPrice 
        },
        firstname: 'Krishna',
        email: 'harish45@gmail.com',
        mobile: '8500000485'
      };

      const response = await axios.post("/api/pretransaction", paymentData);
      
      // Create a form and submit it to PayU
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = response.data.redirectUrl;
      
      // Add all the fields to the form
      for (const [key, value] of Object.entries(response.data.formData)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      }

      // Add form to body and submit
      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error('Payment initiation failed:', error);
      setError('Payment initiation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Order Summary
          </div>
          <div className="mt-4">
            <p className="text-gray-900 font-bold text-xl">Total: ₹100</p>
          </div>
          
          {error && (
            <div className="mt-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <button
            onClick={initiatePayment}
            disabled={isLoading}
            className={`mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;