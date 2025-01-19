'use client';

import { useAppointmentStore } from '@/store/appointmentStore';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Summary: React.FC = () => {
  const router = useRouter();

  const summary = useAppointmentStore((state) => state.summary);
  // const slotCount = useAppointmentStore((state) => state.slotCount);
  const setTotalPrice = useAppointmentStore((state) => state.setTotalPrice);
  const removeSummary = useAppointmentStore((state) => state.removeSummary);

  const [savingIndex, setSavingIndex] = useState<number | null>(null); // Track which entry is being saved
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const totalCumulativePrice = summary.reduce(
    (total, entry) => total + (entry.totalPrice || 0),
    0
  );

  useEffect(() => {
    setTotalPrice(totalCumulativePrice);
  }, [totalCumulativePrice, setTotalPrice]);

  const handleSaveToAPI = async (entry: any, index: number) => {
    try {
      setSavingIndex(index); // Track the entry being saved
      setErrorMessage('');
      setSuccessMessage('');

      const { agent, serviceHair, totalPrice } = entry;
      const serviceData = {
        agent,
        service: serviceHair,
        price: totalPrice,
      };

      // Make the POST request to the API
      const response = await axios.post('/api/service', serviceData);

      if (response.status === 201) {
        setSuccessMessage(`Entry ${index + 1} saved successfully!`);
      } else {
        setErrorMessage('Failed to save data. Please try again.');
      }
    } catch (error: any) {
      console.error('Error saving data:', error);
      setErrorMessage(error.response?.data?.error || 'Something went wrong.');
    } finally {
      setSavingIndex(null); // Reset saving state
    }
  };

  return (
    <div className="p-4 gap-y-4">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold flex justify-center items-center">
          Summary
        </h1>
        {summary.length > 0 && (
          <span className="text-blue-600 ml-2 cursor-pointer" onClick={() => router.push(`/bookyour/customer`)}>
            Checkout
          </span>
        )}
      </div>

     
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

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
            </div>

            {/* Save to API Button */}
            <button
              className={`text-green-500 font-bold text-sm px-4 py-2 rounded-md ${
                savingIndex === index ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-200'
              }`}
              onClick={() => handleSaveToAPI(entry, index)}
              disabled={savingIndex === index} // Disable button only for the entry being saved
            >
              Save
            </button>

            {/* Delete Button */}
            <button
              className="text-red-500 font-bold text-xl"
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
        <div className="ml-4 text-lg font-bold text-gray-950">
          ${totalCumulativePrice}
        </div>
      </div>
    </div>
  );
};

export default Summary;
1