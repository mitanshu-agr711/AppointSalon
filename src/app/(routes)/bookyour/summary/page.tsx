'use client';

import { useAppointmentStore } from '@/store/appointmentStore';
import { useEffect, useState } from 'react';

const Summary: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  
  useEffect(() => {
    setIsClient(true);
  }, []);



  const prices = useAppointmentStore((state) => state.prices);
  const servicesHair = useAppointmentStore((state) => state.servicesHair);
  const agents = useAppointmentStore((state) => state.agents);
  const slots = useAppointmentStore((state) => state.slots);


  const totalPrice = prices.reduce((total, price) => total + (Number(price) || 0), 0);

  if (!isClient) return null; 

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Summary</h1>
      <div>
        <h2 className="font-semibold">Services:</h2>
        {servicesHair.length > 0 ? (
          servicesHair.map((service, index) => (
            <div key={index} className="ml-4">
              {index + 1}. {service}
            </div>
          ))
        ) : (
          <div className="ml-4">No services available.</div>
        )}
      </div>
      <div className="mt-4">
        <h2 className="font-semibold">Prices:</h2>
        {prices.length > 0 ? (
          prices.map((price, index) => (
            <div key={index} className="ml-4">
              {index + 1}. ${price}
            </div>
          ))
        ) : (
          <div className="ml-4">No prices available.</div>
        )}
      </div>
      <div className="mt-4">
        <h2 className="font-semibold">Agents:</h2>
        {agents.length > 0 ? (
          agents.map((agent, index) => (
            <div key={index} className="ml-4">
              {index + 1}. {agent}
            </div>
          ))
        ) : (
          <div className="ml-4">No agents available.</div>
        )}
      </div>
      <div className="mt-4">
        <h2 className="font-semibold">Slots:</h2>
        {slots.length > 0 ? (
          slots.map((slot, index) => (
            <div key={index} className="ml-4">
              {index + 1}. {slot}
            </div>
          ))
        ) : (
          <div className="ml-4">No slots available.</div>
        )}
      </div>
      <div className="mt-4">
        <h2 className="font-semibold">Total Price:</h2>
        <div className="ml-4">${totalPrice}</div>
      </div>
    </div>
  );
};

export default Summary;
