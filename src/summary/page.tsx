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
  // const [successMessage, setSuccessMessage] = useState('');

  const totalPrice = summary.reduce((total, entry) => total + (entry.price || 0), 0);

  useEffect(() => {
    setTotalPrice(totalPrice);
  }, [totalPrice, setTotalPrice]);

  const handleSaveToAPI = async (entry: any, index: number) => {
    try {
      setSavingIndex(index);
      setErrorMessage('');
      // setSuccessMessage('');

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

      const { agent, serviceHair, price } = entry;

      const serviceData = {
        agent,
        service: serviceHair,
        price,
        email,
      };

      const response = await axios.post('/api/service', serviceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        // setSuccessMessage(`Entry ${index + 1} saved successfully!`);
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

  return (
    <div className="p-4 gap-y-4">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold flex justify-center items-center">
          Summary
        </h1>
        {summary.length > 0 && (
          <span
            className="text-blue-600 ml-2 cursor-pointer"
            onClick={() => router.push(`/bookyour/customer`)}
          >
            Checkout
          </span>
        )}
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {/* {successMessage && <p className="text-green-500">{successMessage}</p>} */}

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

            {/* Save Button */}
            <button
              className={`text-green-500 font-bold text-sm px-4 py-2 rounded-md ${
                savingIndex === index ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-200'
              }`}
              onClick={() => handleSaveToAPI(entry, index)}
              disabled={savingIndex === index}
            >
              Save
            </button>

            {/* Remove Button */}
            <button
              className="text-red-500 font-bold text-xl hover:bg-red-200"
              onClick={() => removeSummary(index)}
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
    </div>
  );
};

export default Summary;
