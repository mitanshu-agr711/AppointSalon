'use client';

import { useAppointmentStore } from '@/store/appointmentStore';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Summary: React.FC = () => {
  const router = useRouter();

  const summary = useAppointmentStore((state) => state.summary);
  const setTotalPrice = useAppointmentStore((state) => state.setTotalPrice);
  const removeSummary = useAppointmentStore((state) => state.removeSummary);

  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAddButton, setShowAddButton] = useState(false);

  const totalPrice = summary.reduce((total, entry) => total + (entry.price || 0), 0);

  useEffect(() => {
    setTotalPrice(totalPrice);
  }, [totalPrice, setTotalPrice]);

  const deleteService = async (index: number) => {
    try {
      const response = await fetch('/api/removeService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Service deleted:', data.deletedService);
        removeSummary(index);
        setShowAddButton(true); 
      } else {
        setErrorMessage('Failed to delete, Please try again.');
        console.error('Error:', data.error);
      }
    } catch (error) {
      setErrorMessage('Failed to delete. Please try again.');
      console.error('Error deleting service:', error);
    }
  };

  const handleSaveToAPI = async (entry: any, index: number) => {
    try {
      setSavingIndex(index);
      setErrorMessage('');

      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('User token not found. Please log in again.');
        return;
      }

      const decodedToken: any = jwt.decode(token);
      const email = decodedToken?.email;

      if (!email) {
        setErrorMessage('Email not found in the token. Please log in again.');
        return;
      }

      const { agent, serviceHair, price, slot } = entry;

      const serviceData = {
        agent,
        service: serviceHair,
        price,
        email,
        index,
        slot,
      };
      console.log('serviceData:', serviceData);

      const response = await axios.post('/api/service', serviceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setShowAddButton(true); 
      } else {
        setErrorMessage('Failed to save data. Please try again.');
      }
    } catch (error: any) {
      console.error('Error saving data:', error);
      setErrorMessage(error.response?.data?.error || 'Something went wrong.');
    } finally {
      setSavingIndex(null);
    }
  };

  const handleAdd = () => {
    router.push('/bookyour');
  }
  
  return (
    <div className="p-4 gap-y-4">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold flex justify-center items-center">
          Summary
        </h1>
        {summary.length > 0 && (
          <div
            className="text-blue-600 ml-2 cursor-pointer hover:text-blue-800"
            onClick={() => router.push(`/bookyour/customer`)}
          >
            Checkout
          </div>
        )}
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {summary.length > 0 ? (
        summary.map((entry, index) => (
          <div
            key={index}
            className="mb-6 border border-gray-300 p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <div className="text-gray-700">{entry.serviceHair || 'None selected'}</div>
              <div className="text-blue-700">{entry.slot || 'No slot booked'}</div>
              <div className="flex">
                <h3 className="font-bold">Agent:</h3>
                <div className="text-gray-700 ml-2">{entry.agent || 'None assigned'}</div>
              </div>
              <div className="flex">
                <h3 className="font-bold">Price:</h3>
                <div className="text-gray-700 ml-2">${entry.price || 0}</div>
              </div>
            </div>

            <button
              className={`text-green-500 font-bold text-sm px-4 py-2 rounded-md ${
                savingIndex === index ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-200'
              }`}
              onClick={() => handleSaveToAPI(entry, index)}
              disabled={savingIndex === index}
            >
              Save
            </button>

            <button
              className="text-red-500 font-bold text-xl hover:bg-red-200"
              onClick={() => deleteService(index)}
            >
              -
            </button>
          </div>
        ))
      ) : (
        <div className="text-gray-500">No summary available yet.</div>
      )}

      <div className="border-t border-blue-300 my-6 w-full"></div>
      <div className="mt-4">
        <h2 className="font-semibold text-gray-800">Total Price</h2>
        <div className="ml-4 text-lg font-bold text-gray-950">${totalPrice}</div>
      </div>

      {showAddButton && (
        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => {
              handleAdd();
              
              setShowAddButton(false);
            }}
          >
            + Add
          </button>
        </div>
      )}
    </div>
  );
};

export default Summary;
