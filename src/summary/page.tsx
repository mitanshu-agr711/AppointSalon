'use client';

import { useAppointmentStore } from '@/store/appointmentStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Summary: React.FC = () => {
  const router = useRouter();

  const summary = useAppointmentStore((state) => state.summary);
  const slotCount = useAppointmentStore((state) => state.slotCount);
  const setTotalPrice = useAppointmentStore((state) => state.setTotalPrice);
  const removeSummary = useAppointmentStore((state) => state.removeSummary); // Access removeSummary

  const [showAddButton, setShowAddButton] = useState(false);

  const totalCumulativePrice = summary.reduce(
    (total, entry) => total + (entry.totalPrice || 0),
    0
  );

  useEffect(() => {
    setTotalPrice(totalCumulativePrice);
  }, [totalCumulativePrice, setTotalPrice]);

  useEffect(() => {
    if (slotCount > 0) {
      setShowAddButton(true);
    }
  }, [slotCount]);

  const handleOnClick = () => {
    router.push(`/bookyour?service=true`);
    setShowAddButton(false);
  };

  const handleCheckout = () => {
    router.push(`/bookyour/customer`);
  };

  return (
    <div className="p-4 gap-y-4">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold flex justify-center items-center">
          Summary
        </h1>
        {summary.length > 0 && (
          <span className="text-blue-600 ml-2 cursor-pointer" onClick={handleCheckout}>
            Checkout
          </span>
        )}
      </div>

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

            {/* Delete Button */}
            <button
              className="text-red-500 font-bold text-xl"
              onClick={() => removeSummary(index as number)} // Explicitly set type
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

      {/* Show Add button only if slotCount > 0 and showAddButton is true */}
      {slotCount > 0 && showAddButton && (
        <div
          className="mt-4 text-blue-600 cursor-pointer text-right"
          onClick={handleOnClick}
        >
          +Add
        </div>
      )}
    </div>
  );
};

export default Summary;
