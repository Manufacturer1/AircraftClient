import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  getDay,
  isBefore,
} from "date-fns";

const Calendar = ({
  selectedDate,
  onDateSelect,
  minDate,
  mode,
  onSwitchToReturn,
  onSwitchToDeparture,
  tripType,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  console.log("selected date from calendar: ", selectedDate);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDay = getDay(monthStart);
  const prevMonthDays = Array.from({ length: startDay }, (_, i) => {
    const date = new Date(monthStart);
    date.setDate(-i);
    return date;
  }).reverse();

  const endDay = getDay(monthEnd);
  const nextMonthDays = Array.from({ length: 6 - endDay }, (_, i) => {
    const date = new Date(monthEnd);
    date.setDate(monthEnd.getDate() + i + 1);
    return date;
  });

  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-[300px]">
      <div className="flex justify-between items-center mb-2">
        <button
          type="button"
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          &lt;
        </button>
        <div className="flex flex-col items-center">
          <h2 className="font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
          <p className="text-sm text-gray-500">
            {mode !== null
              ? mode === "departure"
                ? "Select departure date"
                : "Select return date"
              : "Select date"}
          </p>
        </div>
        <button
          type="button"
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>

      {tripType === "RoundTrip" && (
        <div className="flex justify-center gap-2 mb-2">
          <button
            type="button"
            onClick={onSwitchToDeparture}
            className={`px-3 py-1 text-sm rounded-full ${
              mode === "departure"
                ? "bg-[#FF912B] text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Departure
          </button>
          <button
            type="button"
            onClick={onSwitchToReturn}
            disabled={!selectedDate && mode === "departure"}
            className={`px-3 py-1 text-sm rounded-full ${
              mode === "return"
                ? "bg-[#FF912B] text-white"
                : "bg-gray-100 hover:bg-gray-200"
            } ${
              !selectedDate && mode === "departure"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Return
          </button>
        </div>
      )}

      <div className="grid grid-cols-7 gap-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-sm font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}

        {allDays.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          const isDisabled =
            !isCurrentMonth || (minDate && isBefore(day, minDate));

          return (
            <button
              type="button"
              key={i}
              onClick={() => !isDisabled && onDateSelect(day)}
              className={`p-2 rounded-full text-sm 
              ${isDisabled ? "text-gray-300" : "hover:bg-gray-100"} 
              ${isSelected ? "bg-[#FF912B] text-white" : ""}`}
              disabled={isDisabled}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
