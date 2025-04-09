import { useState, useEffect, useRef } from "react";
import Calendar from "../generalUseComponents/Calendar";
import { format, parseISO } from "date-fns";

const FindInput = ({
  icon,
  defaultText,
  optionalIcon = null,
  isDate = null,
  onDateSelect,
  onReturnDateSelect,
  departureDate,
  returnDate,
  tripType,
  inputName,
  value,
  onValueChange,
}) => {
  const [dateValue, setDateValue] = useState(defaultText);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMode, setCalendarMode] = useState("departure");
  const calendarRef = useRef(null);

  useEffect(() => {
    if (departureDate && returnDate) {
      setDateValue(`${formatDate(departureDate)} - ${formatDate(returnDate)}`);
    } else if (departureDate) {
      setDateValue(formatDate(departureDate));
    } else {
      setDateValue(defaultText);
    }
  }, [departureDate, returnDate, defaultText]);

  const formatDate = (date) => {
    if (!date) return "";
    try {
      return format(
        typeof date === "string" ? parseISO(date) : date,
        "dd/MM/yyyy"
      );
    } catch {
      return date;
    }
  };

  const handleCalendarToggle = () => {
    if (isDate) {
      setShowCalendar(!showCalendar);
    }
  };

  const handleDateSelect = (date) => {
    if (calendarMode === "return") {
      onReturnDateSelect(date);
      setShowCalendar(false);
    } else {
      onDateSelect(date);
      if (tripType === "RoundTrip" && !returnDate) {
        setCalendarMode("return");
      } else {
        setShowCalendar(false);
      }
    }
  };

  const switchToReturnDateSelection = () => {
    if (departureDate) {
      setCalendarMode("return");
    }
  };

  const switchToDepartureDateSelection = () => {
    setCalendarMode("departure");
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={calendarRef}>
      {isDate ? (
        <input
          className="w-[290px] h-10 pl-11 pr-3 
                      capitalize
                      text-base text-normal
                      bg-white rounded-[18px]
                      text-neutral-900
                      border-2
                      border-neutral-400
                      border-solid outline-none
                      hover:text-neutral-900 hover:border-neutral-500
                      focus:text-neutral-900 focus:border-neutral-500"
          type="text"
          value={dateValue}
          readOnly
        />
      ) : (
        <input
          name={inputName}
          onChange={onValueChange}
          className="w-[290px] h-10 pl-11 pr-3 
                      capitalize
                      text-base text-normal
                      bg-white rounded-[18px]
                      text-neutral-900
                      border-2
                      border-neutral-400
                      border-solid outline-none
                      hover:text-neutral-900 hover:border-neutral-500
                      focus:text-neutral-900 focus:border-neutral-500"
          type="text"
          value={value}
        />
      )}

      <img
        className="absolute top-[22%] left-[5%]"
        src={icon}
        alt="input icon"
      />
      {optionalIcon && (
        <img
          className={`absolute top-[22%] left-[85%] ${
            isDate ? "cursor-pointer" : ""
          }`}
          src={optionalIcon}
          alt="optional icon"
          onClick={handleCalendarToggle}
        />
      )}
      {showCalendar && (
        <div className="absolute z-10 mt-1">
          <Calendar
            onDateSelect={handleDateSelect}
            selectedDate={
              calendarMode === "return" ? returnDate : departureDate
            }
            minDate={
              calendarMode === "return" && departureDate
                ? departureDate
                : new Date().setDate(new Date().getDate() - 1)
            }
            mode={calendarMode}
            onSwitchToReturn={switchToReturnDateSelection}
            onSwitchToDeparture={switchToDepartureDateSelection}
            tripType={tripType}
          />
        </div>
      )}
    </div>
  );
};

export default FindInput;
