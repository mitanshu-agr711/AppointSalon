'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Sidebar() {
    const [selectedElement, setSelectedElement] = useState("Booking Form");

    const menuItems = [
        "Booking Form",
        "Calendar",
        "Booking Button",
        "Customer Cabinet",
        "Resources",
        "Full Admin Access",
    ];

    return (
        <>
            <div>
                <Image src="/icons8.png" alt="logo" width={40} height={40} />
            </div>
            <div className="w-full h-screen">
                <div className="text-gray-700 flex justify-center items-center font-bold">
                    Pick an Element
                </div>

                <ul className="gap-y-8 flex-col p-4">
                    {menuItems.map((item) => (
                        <li
                            key={item}
                            className={`p-4 rounded-lg cursor-pointer ${
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
            </div>
        </>
    );
}
