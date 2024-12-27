'use client';
import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import Summary from "@/summary/page";
import { useAppointmentStore } from "@/store/appointmentStore";

const Calendar = () => {
    const addSlot = useAppointmentStore((state) => state.addSlot);
    const addSummary = useAppointmentStore((state) => state.addSummary);

    const [currentDate, setCurrentDate] = useState(moment());
    const [selectedEvent, setSelectedEvent] = useState<moment.Moment | null>(null);
    const [availableDays, setAvailableDays] = useState<number[]>([]);
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [hasAddedSummary, setHasAddedSummary] = useState(false);


    const minDate = moment("2024-12", "YYYY-MM");
    const maxDate = moment("2026-01", "YYYY-MM");

    
    useEffect(() => {
        const totalDays = currentDate.daysInMonth();
        const newGreenDays = Array.from({ length: totalDays }, (_, i) => i + 1)
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
        setAvailableDays(newGreenDays);
    }, [currentDate]);

    
    useEffect(() => {
        if (selectedEvent) {
            const newTimeSlots = [
                "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm",
                "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm",
                "08:00 pm", "09:00 pm",
            ]
                .sort(() => 0.5 - Math.random())
                .slice(0, 5);
            setTimeSlots(newTimeSlots);
        }
    }, [selectedEvent]);

    
    const prevMonth = useCallback(() => {
        const newDate = currentDate.clone().subtract(1, "month");
        if (newDate.isSameOrAfter(minDate)) {
            setCurrentDate(newDate);
        }
    }, [currentDate]);

    const nextMonth = useCallback(() => {
        const newDate = currentDate.clone().add(1, "month");
        if (newDate.isSameOrBefore(maxDate)) {
            setCurrentDate(newDate);
        }
    }, [currentDate]);

    
    const generateDays = () => {
        const startOfMonth = currentDate.clone().startOf("month");
        const endOfMonth = currentDate.clone().endOf("month");
        const days: (number | null)[] = [];

        for (let i = 0; i < startOfMonth.day(); i++) {
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
                {/* Calendar Section */}
                <div className="flex flex-col flex-1 p-6 rounded-lg space-y-4">
                    <div className="w-1/2">
                        <div className="w-[420px] shadow-lg rounded-lg overflow-hidden bg-white space-y-3">
                            <div className="flex justify-center items-center text-4xl">Select Date & Time</div>
                            <div className="relative text-center p-4 bg-gray-200">
                                <h1 className="text-xl font-light tracking-wide">
                                    {currentDate.format("MMMM YYYY")}
                                </h1>
                                <div
                                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer ${currentDate.isSameOrAfter(minDate, "month") ? "" : "opacity-50 cursor-not-allowed"}`}
                                    onClick={prevMonth}
                                >
                                    <div className="border-l-8 border-r-8 border-t-8 border-gray-600"></div>
                                </div>
                                <div
                                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer ${currentDate.isSameOrBefore(maxDate, "month") ? "" : "opacity-50 cursor-not-allowed"}`}
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
                                        className={`w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all hover:bg-gray-300 
                                            ${availableDays.includes(day) ? "bg-green-400 text-white font-bold" : "text-gray-600"}
                                            ${day === currentDate.date() && currentDate.isSame(moment(), "month") ? "border-2 border-blue-500" : ""}`}
                                        onClick={() => {
                                            if (day && availableDays.includes(day)) {
                                                const selectedDate = currentDate.clone().date(day);
                                                setSelectedEvent(selectedDate);
                                            }
                                        }}
                                    >
                                        {day || ""}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-around items-center text-xs p-2 bg-gray-200">
                                <div className="flex items-center">
                                    <span className="w-3 h-3 bg-green-400 rounded-full inline-block mr-2"></span>
                                    Available Days
                                </div>
                            </div>
                            {selectedEvent && (
                                <div className="text-center p-4">
                                    <p className="text-lg font-semibold">
                                        Pick Slot: <span className="text-blue-400">{selectedEvent.format("YYYY-MM-DD")}</span>
                                    </p>
                                    <ul className="flex space-x-3 flex-wrap justify-center cursor-pointer">
                                        {timeSlots.map((time, index) => (
                                            <li
                                                key={index}
                                                className="bg-green-400 p-2 cursor-pointer rounded-xl m-1"
                                                onClick={() => {
                                                   
                                                    if (!hasAddedSummary) {
                                                        const selectedSlot = `${selectedEvent.format("YYYY-MM-DD")} ${time}`;
                                                        addSlot(selectedSlot);
                                                        console.log("Selected slot:", selectedSlot);
                            
                                                        addSummary();
                                                        setHasAddedSummary(true); 
                                                      }
                                                }}
                                            >
                                                {time}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="w-1/2">
                    <div className="flex flex-col flex-1 border border-gray-600 p-6 rounded-lg shadow-lg m-5">
                        <Summary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;

