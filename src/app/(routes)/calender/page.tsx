'use client';

import React, { useState } from "react";
import moment from "moment";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [event, setEvent] = useState<string | null>(null); 

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[420px] shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="relative text-center p-4 bg-gray-200">
          <h1 className="text-xl font-light tracking-wide">
            {currentDate.format("MMMM YYYY")}
          </h1>
          <div
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer ${
              currentDate.isSameOrAfter(minDate, "month") ? "" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={prevMonth}
          >
            <div className="border-l-8 border-r-8 border-t-8 border-gray-600"></div>
          </div>
          <div
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer ${
              currentDate.isSameOrBefore(maxDate, "month") ? "" : "opacity-50 cursor-not-allowed"
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
              className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all hover:bg-gray-300 ${
                day === currentDate.date() && currentDate.isSame(moment(), "month")
                  ? "bg-blue-400 text-white font-bold"
                  : "text-gray-600"
              }`}
              onClick={() => {
                if (day) {
                  const selectedDate = currentDate.clone().date(day).format("YYYY-MM-DD");
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
            <p className="text-lg font-semibold">Selected Date: {event}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
