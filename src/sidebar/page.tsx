'use client';

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

    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedElement(event.target.value);
    };

    return (
        <div>
            <div className="p-4 sm:hidden">
                <div className="mb-4">
                    <label htmlFor="menu-dropdown" className="  text-gray-700 font-bold mb-2">
                        Pick Element
                    </label>
                    <select
                        id="menu-dropdown"
                        value={selectedElement}
                        onChange={handleSelectionChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {menuItems.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="w-[80%] h-[100%] m-3  hidden sm:block">
                <div className="text-gray-700 flex justify-center items-center font-bold">
                    Pick an Element
                </div>

                <ul className="gap-y-8 p-2">
                    {menuItems.map((item) => (
                        <li
                            key={item}
                            className={`p-2 rounded-lg cursor-pointer ${selectedElement === item
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
        </div>
    );
}
