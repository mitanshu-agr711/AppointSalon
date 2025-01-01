'use client';

import Summary from '@/summary/page';
import Sidebar from '../../../sidebar/page';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useAppointmentStore } from '@/store/appointmentStore';
import { useState } from 'react';

type Service = {
    name: string;
    description: string;
    icon: string;
    price: number;
};

const services: Service[] = [
    {
        name: 'Hair Coloring',
        description: 'Change Color of hair permanently',
        icon: '/blow-dry.png',
        price: 700,
    },
    {
        name: 'Hair Cut',
        description: 'Experience a perfect haircut with the best stylists',
        icon: '/scissors.png',
        price: 500,
    },
    {
        name: 'Hair Wash',
        description: 'Enjoy a refreshing hair wash experience',
        icon: '/tube.png',
        price: 400,
    },
];

export default function BookApp() {
    const searchParams = useSearchParams();
    const selectedLabel = searchParams.get('service') === 'true';

    const addPrice = useAppointmentStore((state) => state.addPrice);
    const addServiceHair = useAppointmentStore((state) => state.addServiceHair);

    const [cartVisible, setCartVisible] = useState(false);

    const router = useRouter();

    const handleServiceClick = (service: string) => {
        const selectedService = services.find((s) => s.name === service);
        if (selectedService) {
            router.push(`/bookyour/agents`);
            addServiceHair(service);
            addPrice(selectedService.price);
        }
    };

    const toggleCart = () => setCartVisible((prev) => !prev);

    return (
        <>
            <div className="flex-row h-[100%] border border-gray-600  md:w-[20%] sm:hidden" >
                <Sidebar />
            </div>
            
            <div className="flex h-screen">

                <div className="hidden sm:block md:w-[20%] w-auto h-full mr-3">
                    <Sidebar />
                </div>

                {/* <div className="hidden sm:block w-[40%] border h-[100%] border-gray-600  md:w-[30%]" >
                <Sidebar />
            </div> */}
                <div className="flex-grow p-6 flex justify-center items-center">
                    <div className="flex space-x-6 w-full max-w-6xl">
                        <div className="hidden md:block flex flex-col flex-1 border border-gray-600 p-6 rounded-lg shadow-lg space-y-4 ">
                            <div className="text-lg ">
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
                                {services.map((service) => (
                                    <li
                                        key={service.name}
                                        className="flex items-center space-x-4 border p-2 hover:border-blue-500 cursor-pointer rounded-md shadow-sm"
                                        onClick={() => handleServiceClick(service.name)}
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
                            <div className="relative">
                                <Image
                                    src="/cart.png"
                                    alt="cart"
                                    width={40}
                                    height={40}
                                    className="cursor-pointer"
                                    onClick={toggleCart}
                                />
                                {cartVisible && (
                                    <div className="absolute right-0 top-10 bg-white border border-gray-600 p-6 rounded-lg shadow-lg z-50 w-64">
                                        <button
                                            className="text-right text-gray-500 hover:text-red-500"
                                            onClick={toggleCart}
                                        >
                                            Close
                                        </button>
                                        <Summary />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

}
