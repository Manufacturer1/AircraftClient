const FlightDuration = ({ departureTime, arrivalTime }) => {
  const parseTime = (time) => {
    const [timePart, period] = time.split(" ");
    const [hours, minutes] = timePart.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      return (hours + 12) * 60 + minutes;
    }
    if (period === "AM" && hours === 12) {
      return minutes;
    }
    return hours * 60 + minutes;
  };

  const calculateDuration = (departure, arrival) => {
    const depMinutes = parseTime(departure);
    const arrMinutes = parseTime(arrival);

    let diff = arrMinutes - depMinutes;
    if (diff < 0) diff += 24 * 60;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}h${minutes}''`;
  };

  return (
    <div className="flex gap-5 space-y-[10px]">
      {/* Flight Time Calculation*/}
      <div className="flex flex-col items-center justify-between">
        <span className="text-blue-600 font-medium text-lg">
          {departureTime}
        </span>

        <span className="text-neutral-900 font-normal">
          {calculateDuration(departureTime, arrivalTime)}
        </span>

        <span className="text-blue-600 font-medium text-lg mb-[-5px]">
          {arrivalTime}
        </span>
      </div>
      <div>
        <div className="relative flex flex-col items-center">
          <div className="w-3 h-3 border-2 border-blue-600 rounded-full"></div>

          <div className="w-0.5 h-24 bg-blue-600"></div>

          <div className="w-0.5 h-24 bg-blue-600"></div>

          <div className="w-3 h-3 bg-[#FF912BFF] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default FlightDuration;
