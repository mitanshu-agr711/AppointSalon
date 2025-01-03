'use client';

import { useAppointmentStore } from '@/store/appointmentStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Summary: React.FC = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const summary = useAppointmentStore((state) => state.summary);
  // const addSummary = useAppointmentStore((state) => state.addSummary);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleOnClick = () => {
    const b = true; 
    router.push(`/bookyour?service=${b}`);
};


  const totalCumulativePrice = summary.reduce(
    (total, entry) => total + (entry.totalPrice || 0),
    0
  );

  return (
    <div className="p-4 gap-y-4 ">
      <h1 className="text-2xl font-bold flex justify-center items-center ">
        Summary
      </h1>

      {summary.length > 0 ? (
        summary.map((entry, index) => (
          <div
            key={index}
            className="mb-6 border border-gray-300 p-4 rounded-md"
          >
            <div>
              {/* <h3 className="font-bold">Service</h3> */}
              <div className="text-gray-700">{entry.serviceHair || 'None selected'}</div>
            </div>
            <div>
              {/* <h3 className="font-bold">Slot:</h3> */}
              <div className="text-blue-700">{entry.slot || 'No slot booked'}</div>
            </div>
            <div className='flex justify-between'>
              <h3 className="font-bold">Agent:</h3>
              <div className="text-gray-700">{entry.agent || 'None assigned'}</div>
            </div>
    
          </div>
        ))
      ) : (
        <div className="text-gray-500">No summary available yet.</div>
      )}

      {/* Cumulative Total Price */}
      <div className="border-t border-blue-300 my-6 w-full"></div>
      <div className="mt-4">
        <h2 className="font-semibold text-gray-800">Total Price</h2>
        <div className="ml-4 text-lg font-bold text-gray-950">
          ${totalCumulativePrice}
        </div>
      </div>

      <div
        className="mt-4 text-blue-600 cursor-pointer text-right"
        onClick={handleOnClick}
      >
        +Add
      </div>
    </div>
  );
};

export default Summary;
