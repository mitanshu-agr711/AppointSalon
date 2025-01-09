'use client';

import Image from 'next/image';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import Sidebar from '@/sidebar/page';
import Summary from '@/summary/page';
import axios from 'axios';

const customer = ["New Customer", "Already Account"];

export default function CustomerInformation() {
    // const router = useRouter();
    const [selectedElement, setSelectedElement] = useState("New Customer");
    const [formData, setFormData] = useState({
        firstName: "",
        secondName: "",
        email: "",
        password: "",
    });
    const [cartVisible, setCartVisible] = useState(false);
    const toggleCart = () => setCartVisible((prev) => !prev);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    

    const handleOnClick = async () => {
        if (!formData.email || !formData.password || (selectedElement === "New Customer" && (!formData.firstName || !formData.secondName))) {
            alert("Please fill all required fields!");
            return;
        }
        // const sign="api/customerSignup";
        try {
            console.log("formData",formData);
            const response = await axios.post("/api/customerSignup",formData);
            console.log(response.data);
        } 
            catch (error) {
                // Log the entire error object to understand what went wrong
                // if (error.response) {
                //     // Server responded with a status other than 2xx
                //     console.error('Response Error:', error.response.data);
                //     console.error('Response Status:', error.response.status);
                //     console.error('Response Headers:', error.response.headers);
                // } else if (error.request) {
                //     // No response was received
                //     console.error('Request Error:', error.request);
                // } else {
                    // Something happened in setting up the request
                    console.error('Error Message:', error.message);
                // }
                alert("Something went wrong, please try again later.");
            }
        
        // router.push(`/bookyour`);
    };

    return (
        <>
            <div className="flex-row h-[100%] border border-gray-600 md:w-[20%] sm:hidden shadow-lg">
                <Sidebar />
            </div>

            <div className="flex items-center justify-center h-screen">
                <div className='w-3/12'>
                    <div className="absolute hidden sm:block md:w-[20%] w-auto h-full mr-3 inset-y-0 left-0 shadow-lg">
                        <Sidebar />
                    </div>
                </div>
                <div className="justify-center items-center border p-4 w-auto h-auto md:w-3/5 md:h-3/5 divide-y divide-dashed hover:divide-solid shadow-lg">
                    <div className="flex w-full h-full justify-between">
                        <div className="w-1/2 hidden md:block">
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

                        <div className="w-1/2 shadow-lg p-6 rounded-lg">
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
                                            name="secondName"
                                            placeholder="Last Name"
                                            value={formData.secondName}
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
            
                    </div>
                </div>
            </div>
        </>
    );
}
