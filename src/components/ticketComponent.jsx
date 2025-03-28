import ticketIcon from "../images/ticketContainer.svg";
import workBagIcon from "../images/workBag.svg";
import AirlineIcon from "./airlineIconComponent";
import flightArrivalIcon from "../images/flightArrival.svg";

const Ticket = ({ ticketInfo }) => {
  const parseDay = (date) => {
    const day = new Date(date).getDate();
    return day;
  };

  const parseMonth = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthIndex = new Date(date).getMonth();
    return months[monthIndex];
  };

  const parseYear = (date) => {
    const year = new Date(date).getFullYear();
    return year;
  };

  const getFullFlightDate = (date) => {
    const day = parseDay(date);
    const month = parseMonth(date);
    const year = parseYear(date);

    return `${day} ${month.slice(0, 3)}, ${year}`;
  };
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
    return `${hours}h${minutes}m`;
  };

  const formattedDepartureDate = ticketInfo.flightDepartureDate
    .split("/")
    .reverse()
    .join("-");

  const formattedArrivalDate = ticketInfo.flightArrivalDate
    .split("/")
    .reverse()
    .join("-");

  return (
    <div>
      <div className="relative">
        {/*Main ticket icon container*/}
        <img className="block w-full h-full" src={ticketIcon} />
        {/*Airlince Icon and name*/}
        <div className="absolute top-[8%] left-[3%]">
          <AirlineIcon
            airlineBgColor={ticketInfo.airlineBgColor}
            airlineIcon={ticketInfo.airlineIcon}
            airlineName={ticketInfo.airlineName}
          />
        </div>
        {/*Bags info*/}
        <div className="flex gap-2 items-center absolute top-[8%] left-[52%]">
          <img src={workBagIcon} />
          <div className="flex items-center justify-center bg-[#DEE1E6FF] px-3 py-2 text-neutral-800 text-sm rounded-[30px]">
            {ticketInfo.bags}x{ticketInfo.bagCapacity}kg
          </div>
          <div className="flex items-center justify-center bg-[#DEE1E6FF] px-3 py-2 text-neutral-800 text-sm rounded-[30px]">
            {ticketInfo.cabinBags}x{ticketInfo.cabinBagsCapacity}kg
          </div>
        </div>
        {/*Passenger name*/}
        <div className="flex gap-1 absolute top-[22%] left-[3%]">
          <span className="text-neutral-500">Passenger:</span>
          <span className="text-neutral-900 font-bold uppercase">
            {ticketInfo.passengerName}
          </span>
        </div>
        {/*Plane class type*/}
        <div className="flex gap-2 absolute top-[32%] left-[3%]">
          <img src={flightArrivalIcon} />
          <span className="text-[#FF912BFF]">{ticketInfo.classType}</span>
        </div>
        {/*Flight details*/}
        <div className="flex gap-24 items-start absolute top-[42%] left-[3%]">
          {/*Flight departure info */}
          <div className="flex flex-col gap-1">
            <span className="text-[#2424FFFF] text-3xl font-medium">
              {ticketInfo.flightDepartureTime}
            </span>
            <span className="text-neutral-800">{ticketInfo.departureCity}</span>
            <span className="text-neutral-500">
              {getFullFlightDate(formattedDepartureDate)}
            </span>
          </div>
          {/*Flight arrival info */}
          <div className="flex flex-col gap-1">
            <span className="text-[#2424FFFF] text-3xl font-medium">
              {ticketInfo.flightArrivalTime}
            </span>
            <span className="text-neutral-800">{ticketInfo.arrivalCity}</span>
            <span className="text-neutral-500">
              {getFullFlightDate(formattedArrivalDate)}
            </span>
          </div>
        </div>
        {/*Flight duration*/}
        <div className="flex flex-col gap-2 items-center justify-center absolute top-[75%] left-[10%]">
          <div className="h-[1px] w-[223px] bg-[#6C6CFFFF] relative">
            <div
              className="w-2.5 h-2.5 rounded-full bg-white
             border-2 border-solid border-[#6C6CFFFF] absolute top-[-5px] left-[-3px]"
            ></div>
            <div
              className="w-2.5 h-2.5 rounded-full bg-[#FF912BFF]
             border-2 border-solid border-[#6C6CFFFF] absolute top-[-5px] left-[100%]"
            ></div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <svg
                className="w-4 h-4"
                fill="#6C6CFFFF"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M16.24 7.75A5.974 5.974 0 0 0 12 5.99v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0a5.99 5.99 0 0 0-.01-8.48zM12 1.99c-5.52 0-10 4.48-10 10s4.48 10 10 10s10-4.48 10-10s-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z" />
              </svg>
            </div>
            <span className="text-neutral-800">
              {calculateDuration(
                ticketInfo.flightDepartureTime,
                ticketInfo.flightArrivalTime
              )}
            </span>
          </div>
        </div>
        {/*Check in time and date*/}
        <div className="flex gap-56 absolute top-[90%] left-[3%]">
          <p className="text-sm text-neutral-800">
            Check-in:{" "}
            <span className="font-semibold">{ticketInfo.checkInDate}</span>
          </p>
          <p className="text-sm text-neutral-500">
            *All time displayed are local
          </p>
        </div>

        {/*Right ticket section*/}
        <div className="flex items-center gap-2 absolute top-[8%] left-[78%]">
          <div>
            <svg
              viewBox="0 0 512 512"
              width="35px"
              height="35px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(1 0 0 1 256 256)">
                <path
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeDashoffset: 0,
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 4,
                    fill: "#fff",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform=" translate(-256, -256)"
                  d="M 270.7 9.7 C 268.2 3.8 262.4 0 256 0 C 249.60000000000002 0 243.8 3.8 241.3 9.7 L 197.2 112.6 C 193.79999999999998 120.6 192 129.1 192 137.79999999999998 L 192 214.79999999999998 L 48 298.79999999999995 L 48 280 C 48 266.7 37.3 256 24 256 C 10.700000000000003 256 0 266.7 0 280 L 0 336 L 0 368 L 0 392 C 0 405.3 10.7 416 24 416 C 37.3 416 48 405.3 48 392 L 48 384 L 192 384 L 192 416.7 L 133.5 468 C 130 471 128 475.4 128 480 L 128 496 C 128 504.8 135.2 512 144 512 L 240 512 L 240 448 C 240 439.2 247.2 432 256 432 C 264.8 432 272 439.2 272 448 L 272 512 L 368 512 C 376.8 512 384 504.8 384 496 L 384 480 C 384 475.4 382 471 378.5 468 L 320 416.7 L 320 384 L 464 384 L 464 392 C 464 405.3 474.7 416 488 416 C 501.3 416 512 405.3 512 392 L 512 368 L 512 336 L 512 280 C 512 266.7 501.3 256 488 256 C 474.7 256 464 266.7 464 280 L 464 298.8 L 320 214.8 L 320 137.8 C 320 129.10000000000002 318.2 120.60000000000001 314.8 112.60000000000001 L 270.7 9.7 z"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
          <h2 className="text-white font-semibold text-xl">E-flight</h2>
        </div>
        {/*Booking Id*/}
        <div className="flex flex-col gap-1 absolute top-[22%] left-[76%]">
          <span className="text-white font-medium text-lg">Booking ID</span>
          <span className="text-white font-medium text-2xl">
            {ticketInfo.bookingId}
          </span>
        </div>

        {/*Airline booking code*/}
        <div className="flex flex-col gap-1 absolute top-[45%] left-[76%]">
          <span className="text-white text-lg font-medium">
            Airline Booking Code
          </span>
          <span className="text-white font-medium text-2xl">
            {ticketInfo.airlineBookingCode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
