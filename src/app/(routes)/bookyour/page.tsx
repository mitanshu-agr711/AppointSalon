'use client';

import Summary from '@/summary/page';
import Sidebar from '../../../sidebar/page';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useAppointmentStore } from '@/store/appointmentStore';
import { FC, Suspense, useState } from 'react';

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
        price: 20,
    },
    {
        name: 'Hair Cut',
        description: 'Experience a perfect haircut with the best stylists',
        icon: '/scissors.png',
        price: 15,
    },
    {
        name: 'Hair Wash',
        description: 'Enjoy a refreshing hair wash experience',
        icon: '/tube.png',
        price: 15,
    },
];

export default function BookApp() {

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
            <div className="flex-row h-[100%] border border-gray-600  md:w-[20%] sm:hidden m-5 bg-gray-100 shadow-md" >
                <Sidebar />
            </div>

            <div className="flex h-screen bg-gray-100">

                <div className="hidden sm:block md:w-[20%] w-auto h-full mr-3 shadow-lg bg-white shadow-md">
                    <Sidebar />
                </div>

                <div className="flex-grow p-6 flex justify-center items-center">
                    <div className="flex space-x-6 w-full max-w-6xl">
                        <div className="hidden md:block flex flex-col flex-1 border bg-white border-gray-600 p-6 rounded-lg shadow-lg space-y-4 bg-gray-100 shadow-md">
                            <div className="text-lg text-gray-700">
                                <div className="font-bold text-orange-600">Service Selection</div>
                                <span className="text-gray-600">
                                    Please select a service for which you want to schedule an appointment
                                </span>
                            </div>
                            <div className="mt-auto">
                                Contact Us: <span className="text-blue-500">+91 999xxxxx</span>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 border bg-white border-gray-600 p-6 rounded-lg shadow-lg space-y-4 bg-gray-100 shadow-md">
                            <div className="text-2xl text-center text-orange-600">Available Services</div>
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
                                            <div className="text-gray-700">{service.name}</div>
                                            <div className="text-sm text-gray-600">{service.description}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Cart toggleCart={toggleCart} cartVisible={cartVisible} />
                        </Suspense>
                    </div>
                </div>
            </div>
            
        </>
    );

}

interface Props {
    toggleCart: () => void;
    cartVisible: boolean;

}

const Cart: FC<Props> = ({
    toggleCart,
    cartVisible
}) => {

    const searchParams = useSearchParams();
    const selectedLabel = searchParams.get('service') === 'true';

    if (!selectedLabel) return null;

    return (
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
    
    )
};
