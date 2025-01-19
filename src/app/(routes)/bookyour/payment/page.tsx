'use client';
import axios from 'axios';
import { useState } from 'react';
import Sidebar from '@/sidebar/page';
import Image from 'next/image';


const HomePage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');

  // const initiatePayment = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError('');

  //     const totalPrice = 100;
  //     const paymentData = {
  //       amount: totalPrice,
  //       product: {
  //         title: "Total Order",
  //         price: totalPrice
  //       },
  //       firstname: 'Krishna',
  //       email: 'harish45@gmail.com',
  //       mobile: '8500000485'
  //     };

  // const response = await axios.post("/api/pretransaction", paymentData);

  // // Create a form and submit it to PayU
  // const form = document.createElement('form');
  // form.method = 'POST';
  // form.action = response.data.redirectUrl;

  //     // Add all the fields to the form
  //     for (const [key, value] of Object.entries(response.data.formData)) {
  //       const input = document.createElement('input');
  //       input.type = 'hidden';
  //       input.name = key;
  //       input.value = value as string;
  //       form.appendChild(input);
  //     }

  //     // Add form to body and submit
  //     document.body.appendChild(form);
  //     form.submit();

  //   } catch (error) {
  //     console.error('Payment initiation failed:', error);
  //     setError('Payment initiation failed. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <div className="flex-row h-[100%] border border-gray-600 md:w-[20%] sm:hidden shadow-lg">
        <Sidebar />
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className='w-3/12'>
          <div className="absolute hidden sm:block md:w-[20%] w-auto h-full mr-3 inset-y-0 left-0 shadow-lg">
            <Sidebar />
          </div>
        </div>
        <div className="justify-center items-center border p-4 w-auto h-auto md:w-3/5 md:h-4/5 divide-y divide-dashed hover:divide-solid shadow-lg">
          <div className="flex w-full h-full justify-between">
            <div className="w-1/2 hidden md:block">
              <div className="h-full justify-center items-center flex-col flex space-y-8">
                <div className="text-lg mt-4 w-3/4">
                  <div className="justify-center items-center flex">
                    <Image src="/verify.png" alt="verify Icon" width={50} height={70} />
                  </div>
                  <div className="font-bold flex justify-center text-2xl items-center">
                    Verify Order Details
                  </div>
                </div>
                <div className="text-slate-500 text w-{40}">
                  Double check your reservation details and click submit button if everything is correct
                </div>
              </div>
            </div>
            <div className="w-1/2 shadow-lg  p-6 rounded-lg">
             <h1>Verify Order Details</h1>
            </div>
            
          </div>
        </div>
      </div>
      

    </>

    // <div className="container mx-auto px-4 py-8">
    //   <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    //     <div className="p-8">
    //       <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
    //         Order Summary
    //       </div>
    //       <div className="mt-4">
    //         <p className="text-gray-900 font-bold text-xl">Total: ₹100</p>
    //       </div>

    //       {error && (
    //         <div className="mt-4 text-red-500 text-sm">
    //           {error}
    //         </div>
    //       )}

    //       <button
    //         onClick={initiatePayment}
    //         disabled={isLoading}
    //         className={`mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md 
    //           ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
    //       >
    //         {isLoading ? 'Processing...' : 'Pay Now'}
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default HomePage;