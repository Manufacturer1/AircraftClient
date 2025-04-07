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

const Calendar = ({ selectedDate, onDateSelect, minDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get days from previous month to fill the first week (starting from Sunday)
  const startDay = getDay(monthStart);
  const prevMonthDays = Array.from({ length: startDay }, (_, i) => {
    const date = new Date(monthStart);
    date.setDate(-i);
    return date;
  }).reverse();

  // Get days from next month to fill the last week (ending on Saturday)
  const endDay = getDay(monthEnd);
  const nextMonthDays = Array.from({ length: 6 - endDay }, (_, i) => {
    const date = new Date(monthEnd);
    date.setDate(monthEnd.getDate() + i + 1);
    return date;
  });

  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-[300px]">
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          &lt;
        </button>
        <h2 className="font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button
          type="button"
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>

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
