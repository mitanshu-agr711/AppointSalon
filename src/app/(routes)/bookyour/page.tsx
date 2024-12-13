'use client';

import Summary from './summary/page';
import Sidebar from './sidebar/page';
import Image from 'next/image';
import { useState } from 'react';

type Service = {
    name: string;
    description: string;
    icon: string;
};

const labels = ['a', 'b', 'c'];

const services: Service[] = [
    {
        name: 'Hair Coloring',
        description: 'Change Color of hair permanently',
        icon: '/blow-dry.png',
    },
    {
        name: 'Hair Cut',
        description: 'Experience a perfect haircut with the best stylists',
        icon: '/scissors.png',
    },
    {
        name: 'Hair Wash',
        description: 'Enjoy a refreshing hair wash experience',
        icon: '/tube.png',
    },
];

export default function BookApp() {
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

    const handleServiceClick = (label: string) => {
        setSelectedLabel(label);
    };

    return (
        <div className="flex h-screen">
          
            <div className="w-[14%] border border-gray-600">
                <Sidebar />
            </div>
            <div className="flex-grow p-6 flex justify-center items-center">
                <div className="flex space-x-6 w-full max-w-6xl">
                  
                    <div className="flex flex-col flex-1 border border-gray-600 p-6 rounded-lg shadow-lg space-y-4">
                        <div className="text-lg">
                            <div className="font-bold">Service Selection</div>
                            <span className="text-gray-600">
                                Please select a service for which you want to schedule an appointment
                            </span>
                        </div>
                        <div className="mt-auto">
                            ContactUs: <span className="text-blue-500">+91 999xxxxx</span>
                        </div>
                    </div>

                  
                    <div className="flex flex-col flex-1 border border-gray-600 p-6 rounded-lg shadow-lg space-y-4">
                        <div className="text-2xl text-center">Available Services</div>
                        <ul className="space-y-4">
                            {services.map((service, index) => (
                                <li
                                    key={labels[index]}
                                    className="flex items-center space-x-4 border p-2 hover:border-blue-500 cursor-pointer rounded-md shadow-sm"
                                    onClick={() => handleServiceClick(labels[index])}
                                >
                                    <Image
                                        src={service.icon}
                                        alt={`${service.name} Icon`}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10"
                                    />
                                    <div>
                                        <div>{service.name}</div>
                                        <div className="text-sm text-gray-600">{service.description}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {selectedLabel && (
                        <div className="flex flex-col flex-1 border border-gray-600 p-6 rounded-lg shadow-lg">
                            <Summary selectedServiceId={selectedLabel} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
