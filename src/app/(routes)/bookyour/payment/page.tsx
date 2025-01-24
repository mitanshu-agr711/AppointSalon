'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Sidebar from '@/sidebar/page';
import Image from 'next/image';
import { useAppointmentStore } from '@/store/appointmentStore';
import jwt from 'jsonwebtoken';

interface Service {
  service: string;
  slot: string;
  agent: string;
  price: number;
}

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<Service[]>([]);
  const [user, setUser] = useState<{ firstName: string; lastName: string; mobile?: string } | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState('');
  const removeSummary = useAppointmentStore((state) => state.removeSummary);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User token not found. Please log in again.');
      return;
    }

    const decodedToken: any = jwt.decode(token);
    const userEmail = decodedToken?.email;

    if (!userEmail) {
      setError('Email not found in the token. Please log in again.');
      return;
    }

    setEmail(userEmail);

    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/getcustomer', { params: { email: userEmail } });
        setUser(res.data);
      } catch (error) {
        setError('User not found with the provided email.');
        console.error('Error fetching user data:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/getservice', { params: { email: userEmail } });
        setResponse(res.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to fetch services.');
      }
    };

    fetchUser();
    fetchServices();
  }, []);

  const deleteService = async (index: number) => {
    try {
      const res = await axios.post('/api/removeService', { index });

      if (res.status === 200) {
        setResponse((prevResponse) => prevResponse.filter((_, i) => i !== index));
        removeSummary(index);
      } else {
        setError('Failed to delete service.');
      }
    } catch (error) {
      setError('Error deleting service.');
      console.error('Error deleting service:', error);
    }
  };

  const totalPrice = response.reduce((total, item) => total + (item.price || 0), 0);

  const initiatePayment = async () => {
    try {
      setIsLoading(true);
      setError('');

      if (!user || !email) {
        setError('User information is missing.');
        return;
      }


      const mobile = user.mobile || '0000000000';

      const paymentData = {
        amount: totalPrice,
        product: {
          title: "Hair Service",
          price: totalPrice
        },
        firstname: user.firstName,
        email: email,
        mobile: mobile
      };

      const response = await axios.post("/api/pretransaction", paymentData);


      const form = document.createElement('form');
      form.method = 'POST';
      form.action = response.data.redirectUrl;

      for (const [key, value] of Object.entries(response.data.formData)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      }


      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error('Payment initiation failed:', error);
      setError('Payment initiation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToService = (index: number) => {
    const element = document.getElementById(`service-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };


  return (
    <>
      <div className="flex-row h-[100%] border border-gray-600 md:w-[20%] sm:hidden shadow-lg mb-3">
        <Sidebar />
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="w-3/12">
          <div className="absolute hidden sm:block md:w-[20%] w-auto h-full mr-3 inset-y-0 left-0 shadow-lg">
            <Sidebar />
          </div>
        </div>
        <div className="justify-center items-center border p-4 w-full h-auto md:w-3/5 md:h-auto divide-y divide-dashed hover:divide-solid shadow-lg">
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
                  {user && (
                    <p className="text-gray-500 text-center">
                      Welcome, {user.firstName} {user.lastName}!
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 shadow-lg p-6 rounded-lg flex flex-col h-[80vh]">
              <div className="flex-none">
                <h1 className="text-2xl flex font-bold items-center">Verify Order Details</h1>
                {error && (
                  <div className="mt-4 text-red-500 text-sm">
                    {error}
                  </div>
                )}
              </div>
              
              {response && response.length > 0 ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <ul className="space-y-4">
                      {response.map((item: Service, index: number) => (
                        <li
                          key={index}
                          id={`service-${index}`}
                          className="transition-all duration-300 ease-in-out transform"
                        >
                          <div className="rounded-lg relative m-2 shadow-lg p-4 cursor-pointer hover:shadow-xl"
                            onClick={() => scrollToService(index)}>
                            <button
                              className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full p-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteService(index);
                              }}
                              aria-label="Delete service"
                            >
                              ❌
                            </button>
                            <div className="text-xl text-black p-1">{item.service}</div>
                            <div className="text-blue-500 m-1">{item.slot}</div>
                            <div className="text-slate-700 text-xl mb-1">Agent:</div>
                            <div className="flex items-center">
                              <Image src="/contact.png" alt="verify Icon" width={30} height={40} />
                              <span className="text-left text-lg ml-2">{item.agent}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex-none mt-4">
                    <div className="p-4 border rounded-md shadow-md bg-gray-100 flex justify-between">
                      <h2 className="text-xl font-semibold">Total Price:</h2>
                      <p className="text-2xl font-bold">₹{totalPrice}</p>
                    </div>
                    <button
                      onClick={initiatePayment}
                      disabled={isLoading || response.length === 0}
                      className={`mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md 
                        ${isLoading || response.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                    >
                      {isLoading ? 'Processing...' : 'Pay Now'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-4">
                  No services found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  );
};

export default HomePage;