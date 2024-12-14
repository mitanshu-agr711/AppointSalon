'use client';

import React, { useState } from "react";
import moment from "moment";
import Summary from "../bookyour/summary/page";
import { useSearchParams } from 'next/navigation';



const Calendar = () => {

    const searchParams = useSearchParams();
    const service = searchParams.get('service') || '';
    console.log(service);

    const [currentDate, setCurrentDate] = useState(moment());
    const [event, setEvent] = useState<moment.Moment | null>(null);

    const minDate = moment("2024-12", "YYYY-MM");
    const maxDate = moment("2026-01", "YYYY-MM");

    const prevMonth = () => {
        const newDate = currentDate.clone().subtract(1, "month");
        if (newDate.isSameOrAfter(minDate)) {
            setCurrentDate(newDate);
        }
    };

    const nextMonth = () => {
        const newDate = currentDate.clone().add(1, "month");
        if (newDate.isSameOrBefore(maxDate)) {
            setCurrentDate(newDate);
        }
    };

    const generateDays = () => {
        const startOfMonth = currentDate.clone().startOf("month");
        const endOfMonth = currentDate.clone().endOf("month");
        const days = [];

        const startDay = startOfMonth.day();
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        for (let day = 1; day <= endOfMonth.date(); day++) {
            days.push(day);
        }

        return days;
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
             <div className="flex space-x-6 w-full max-w-6xl p-4">

                <div className="flex flex-col flex-1 p-6 rounded-lg space-y-4">
                    <div className="w-1/2">
                        <div className="w-[420px] shadow-lg rounded-lg overflow-hidden bg-white space-y-3">
                            <div className="flex justify-center items-center text-4xl">Select Date & Time</div>
                            <div className="relative text-center p-4 bg-gray-200">
                                <h1 className="text-xl font-light tracking-wide">
                                    {currentDate.format("MMMM YYYY")}
                                </h1>
                                <div
                                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer ${currentDate.isSameOrAfter(minDate, "month") ? "" : "opacity-50 cursor-not-allowed"
                                        }`}
                                    onClick={prevMonth}
                                >
                                    <div className="border-l-8 border-r-8 border-t-8 border-gray-600"></div>
                                </div>
                                <div
                                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer ${currentDate.isSameOrBefore(maxDate, "month") ? "" : "opacity-50 cursor-not-allowed"
                                        }`}
                                    onClick={nextMonth}
                                >
                                    <div className="border-r-8 border-l-8 border-b-8 border-gray-600"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 bg-gray-300 text-sm uppercase tracking-wider">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                    <div key={day} className="text-center py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-y-2 p-4">
                                {generateDays().map((day, index) => (
                                    <div
                                        key={index}
                                        className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all hover:bg-gray-300 ${day === currentDate.date() && currentDate.isSame(moment(), "month")
                                            ? "bg-blue-400 text-white font-bold"
                                            : "text-gray-600"
                                            }`}
                                        onClick={() => {
                                            if (day) {
                                                const selectedDate = currentDate.clone().date(day)
                                                setEvent(selectedDate);
                                                console.log("Selected date:", selectedDate);
                                            }
                                        }}
                                    >
                                        {day || ""}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-around items-center text-xs p-2 bg-gray-200">
                                <div className="flex items-center">
                                    <span className="w-3 h-3 bg-blue-400 rounded-full inline-block mr-2"></span>
                                    Available
                                </div>
                            </div>
                            {event && (
                                <div className="text-center p-4">
                                    <p className="text-lg font-semibold">Pick Sloat: <span className="text-blue-400">{event.format("YYYY-MM-DD")}</span></p>
                                    <ul className="flex space-x-3 flex-wrap justify-center">
                                        {["09:00 am", "12:00 am ", "10:00 am", "13:00 pm", "16:00 pm", "18:00 pm", "14:00 pm", "19:00 pm", "11:00 am", "15:00 pm"]
                                            .sort(() => Math.random() - 0.5)
                                            .slice(0, 5)
                                            .map((time, index) => (
                                                <li key={index} className="bg-green-400 p-2 rounded-xl m-1">
                                                    {time}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                    </div>
                    </div>
                    
                    <div className="w-1/2">
                        <div className="flex flex-col flex-1 border border-gray-600 p-6 rounded-lg shadow-lg m-5">
                            <Summary selectedServiceId={service} />
                        </div>
                        </div>
            </div>
        </div>

    );
};

export default Calendar;
