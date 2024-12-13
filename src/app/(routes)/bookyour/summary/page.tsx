'use client';

import { useState, useEffect } from 'react';

type Service = {
    _id: string;
    service: string;
    price: number;
    select: string;
};

type SummaryProps = {
    selectedServiceId: string; 
};

const Summary: React.FC<SummaryProps> = ({ selectedServiceId }) => {
    const [services, setServices] = useState<Service[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/user.get'); 
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result: Service[] = await response.json();
                setServices(result);
            } catch (err: any) {
                setError(err.message || 'Something went wrong.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedServiceId]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    
    const selectedService = services.find((service) => service.select === selectedServiceId);
    if (!selectedService) {
        console.log("No matching service found for selected ID:", selectedServiceId);
        return <div>No service found for the selected option.</div>;
    }
    return (
        <div className="space-y-8">
            <div className="text-4xl w-full flex justify-center items-center">
                Summary
            </div>
            <div className="border border-slate-800 p-4 w-full h-full divide-y divide-dashed hover:divide-solid">
                <ul className="space-y-4 h-full">
                    <li className="w-full flex justify-between">
                        <span>Service:</span>
                        <span>{selectedService.service}</span>
                    </li>
                    <li className="w-full flex justify-between">
                        <span>Price:</span>
                        <span>{`$${selectedService.price.toFixed(2)}`}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Summary;
