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
    const [cartVisible, setCartVisible] = useState(false);
    const toggleCart = () => setCartVisible((prev) => !prev);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOnClick = () => {
        if (!formData.email || !formData.password || (selectedElement === "New Customer" && (!formData.firstName || !formData.lastName))) {
            alert("Please fill all required fields!");
            return;
        }
        router.push(`/bookyour`);
    };

    return (
        <>
            <div className="flex-row h-[100%] border border-gray-600 md:w-[20%] sm:hidden shadow-lg">
                <Sidebar />
            </div>

            <div className="flex items-center justify-center h-screen">
                <div className='w-1/2 md:w-3/12'>
                    <div className="absolute hidden sm:block md:w-[20%] w-auto h-full mr-3 inset-y-0 left-0 shadow-lg">
                        <Sidebar />
                    </div>
                </div>
                <div className=" border p-4 justify-center items-center flex   sm:w-4/5 h-4/5 md:w-3/5 md:h-4/5 divide-y divide-dashed hover:divide-solid shadow-lg">
                    <div className="flex w-full h-full  ">
                        <div className="w-1/2 hidden md:block">
                            <div className="h-full justify-center items-center flex-col flex space-y-8">
                                <div className="text-lg mt-4 w-3/4">
                                    <div className="justify-center items-center flex">
                                        <Image src="/contact.png" alt="Contact Icon" width={40} height={40} />
                                    </div>
                                    <div className="font-bold flex text-2xl m-2">
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
                      <div className='md:w-1/2 flex h-4/5'>
                        <div className=" p-3 rounded-lg">
                            <div className="flex justify-center items-center mb-6 text-3xl">
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
                        </div>

                            <div className="relative">
                                <Image
                                    src="/cart.png"
                                    alt="cart"
                                    width={70}
                                    height={70}
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
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}
