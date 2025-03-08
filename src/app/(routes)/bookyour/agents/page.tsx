'use client';

import Image from 'next/image';
import Summary from '@/summary/page';
import { useRouter } from 'next/navigation';
import Sidebar from '@/sidebar/page';
import { useAppointmentStore } from '@/store/appointmentStore';
import { useState } from 'react';

interface Agent {
    service: string;
}

export default function Agents() {
    const router = useRouter();
    const addAgent = useAppointmentStore((state) => state.addAgent);
    const [cartVisible, setCartVisible] = useState(false);

    const handleOnclick = () => {
        router.push(`/bookyour`);
    };

    const handleOnAgent = ({ service }: Agent) => {
        router.push(`/calender`);
        addAgent(service);
    };

    const agents = [
        { name: 'Any Agent', image: '/boycontacts.png' },
        { name: 'John', image: '/young-man.png' },
        { name: 'Mirra', image: '/woman.png' },
    ];

    const toggleCart = () => setCartVisible((prev) => !prev);

    return (
        <>
            <div className="flex-row h-[100%] border border-gray-600 md:w-[20%] sm:hidden shadow-lg bg-white">
                <Sidebar />
            </div>

            <div className="flex h-screen bg-gray-100 space-x-10 ">
                <div className="hidden sm:block md:w-[20%] w-auto h-full mr-3 shadow-lg bg-white">
                    <Sidebar />
                </div>
                <div className="flex items-center justify-center h-screen w-screen">
                    <div className="justify-center items-center border border-slate-800 p-4 w-auto h-auto divide-y divide-dashed hover:divide-solid shadow-lg bg-white rounded-lg">
                        <div className="flex w-full h-full justify-between">
                            <div className="w-1/2 md:block hidden">
                                <div className="h-full justify-center items-center flex-col flex space-y-8">
                                    <div className="text-lg mt-4 w-3/4">
                                        <div className="justify-center items-center flex">
                                            <Image src="/contact.png" alt="Contact Icon" width={40} height={40} />
                                        </div>
                                        <div className="font-bold flex justify-center items-center text-orange-600">Agents</div>
                                        <span className="text-gray-600 w-1/6">
                                            Please select an Agent that will be providing you a service
                                        </span>
                                    </div>
                                    <div className="w-3/4">
                                        Contact Us: <span className="text-blue-500">+91 999xxxxx</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2">
                           
                                <div className="flex justify-center items-center m-4 mb-6 text-4xl text-orange-600">Available Agents</div>
                                <ul className="flex flex-col items-center space-y-4">
                                    {agents.map((agent) => (
                                        <li
                                            key={agent.name}
                                            className="cursor-pointer outline outline-2 outline-slate-500 hover:outline-blue-500 p-4 rounded-lg md:w-2/3 flex flex-row  items-center space-x-4 w-full"
                                            onClick={() => handleOnAgent({ service: agent.name })}
                                        >
                                            <Image
                                                src={agent.image}
                                                alt={`${agent.name} Icon`}
                                                width={40}
                                                height={40}
                                                className="w-14 h-14 flex justify-center items-center m-3"
                                            />
                                            <div className="font-semibold text-gray-700">{agent.name}</div>
                                        </li>
                                    ))}
                                    <div className="mt-6 cursor-pointer text-gray-600 hover:text-orange-600" onClick={handleOnclick}>
                                        Back
                                    </div>
                                </ul>

                              
                            </div>
                            <div className="relative">
                                <Image
                                    src="/cart.png"
                                    alt="Cart Icon"
                                    width={40}
                                    height={40}
                                    className="cursor-pointer"
                                    onClick={toggleCart}
                                />
                                {cartVisible && (
                                    <div className="absolute right-0 top-10 bg-white border border-gray-600 p-6 rounded-lg shadow-lg z-50 w-64 animate-fadeIn">
                                        <button
                                            className="text-right text-gray-500 hover:text-red-500 mb-4"
                                            onClick={toggleCart}
                                        >
                                            Close
                                        </button>
                                        <Summary />
                                    </div>
                                )}
                            </div>
                          
                          
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
