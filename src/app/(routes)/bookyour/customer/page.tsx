'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/sidebar/page';
import Summary from '@/summary/page';

const customer = ["New Customer", "Already Account"];

export default function Agents() {
    const router = useRouter();
    const [selectedElement, setSelectedElement] = useState("New Customer");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOnClick = () => {
    
        router.push(`/bookyour`);
    };


    return (
        <>
            <div className="flex-row h-[100%] border border-gray-600 md:w-[20%] sm:hidden">
                <Sidebar />
            </div>

            <div className="flex items-center justify-center h-screen">
                <div className="hidden sm:block md:w-[20%] w-auto h-full mr-3">
                    <Sidebar />
                </div>

                <div className="justify-center items-center border border-slate-800 p-4 w-auto h-auto divide-y divide-dashed hover:divide-solid">
                    <div className="flex w-full h-full justify-between">
                        <div className="w-1/2">
                            <div className="h-full justify-center items-center flex-col flex space-y-8">
                                <div className="text-lg mt-4 w-3/4">
                                    <div className="justify-center items-center flex">
                                        <Image src="/contact.png" alt="Contact Icon" width={40} height={40} />
                                    </div>
                                    <div className="font-bold flex justify-center text-2xl items-center">
                                        Enter Your Information
                                    </div>
                                    <span className="text-gray-600 w-1/6">
                                        Please Enter Your Information
                                    </span>
                                </div>
                                <div className="w-3/4">
                                    ContactUs:-<span className="text-blue-500">+91 999xxxxx</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/2">
                            <div className="flex justify-center items-center m-4 mb-6 text-3xl">
                                Customer Information
                            </div>
                            <ul className="flex justify-center items-center space-x-4 text-1xl">
                                {customer.map((item) => (
                                    <li
                                        key={item}
                                        className={`p-2 rounded-lg cursor-pointer ${
                                            selectedElement === item
                                                ? "bg-blue-500 text-white"
                                                : "hover:bg-gray-200 text-gray-700"
                                        }`}
                                        onClick={() => setSelectedElement(item)}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 space-y-4">
                                {selectedElement === "New Customer" ? (
                                    <>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </>
                                ) : null}
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    onClick={handleOnClick}
                                >
                                    Submit
                                </button>
                            </div>
                            {/* <div className="mt-6 cursor-pointer" onClick={() => router.back()}>
                                🔙Back
                            </div> */}
                        </div>

                        <div className="flex flex-col flex-1 border border-gray-600 p-6 rounded-lg shadow-lg m-5">
                            <Summary />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
