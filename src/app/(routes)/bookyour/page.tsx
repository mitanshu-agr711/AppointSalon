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
        <div className='flex flex-nowrap'>
            <div className='border w-[14%] border-gray-600 h-screen flex flex-nowrap'>
                <Sidebar />
            </div>
            <div className="flex items-center justify-center h-screen m-6">
                <div className="justify-center items-center w-full h-full divide-y divide-dashed hover:divide-solid">
                    <div className="flex w-5/6 space-x-5 flex-nowrap h-5/6 border border-gray-600">
                        <div className="w-1/3">
                            <div className="space-y-8 flex flex-col justify-center items-center h-full">
                                <div className="text-lg mt-4 w-3/4">
                                    <div className="font-bold flex">Service Selection</div>
                                    <span className="text-gray-600 w-1/6">Please select a service for which you want to schedule an appointment</span>
                                </div>
                                <div className='w-3/4'>
                                    ContactUs:-<span className="text-blue-500">+91 999xxxxx</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/3">
                            <div className="space-y-8 flex flex-col justify-center items-center h-full">
                                <div className="flex justify-center items-center m-4 mb-2 text-4xl">Available Service</div>
                                <ul className="space-y-5">
                                    {services.map((service, index) => (
                                        <li
                                            key={labels[index]}
                                            className="flex items-center space-x-4 outline outline-2 outline-offset-2 outline-slate-500 hover:outline-blue-500 w-auto p-2 cursor-pointer"
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
                        </div>

                        {selectedLabel && (
                            <div className="w-1/3">
                               
                                
                                <Summary selectedServiceId={selectedLabel} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
