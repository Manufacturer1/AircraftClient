import AirlineIcon from "../../generalUseComponents/airlineIconComponent";
import flightArrivalIcon from "../../../images/flightArrival.svg";
import DateContainer from "./dateContainerComponent";
import dollarIcon from "../../../images/dollar.svg";

const BookingFlightDetails = ({ bookingFlightDetails }) => {
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
    return `${hours}h ${minutes}m`;
  };

  return (
    <div>
      <div className="flex justify-between mb-7">
        <div className="flex flex-col">
          <AirlineIcon
            className="mb-1"
            airlineBgColor={bookingFlightDetails.airlineBgColor}
            airlineIcon={bookingFlightDetails.airlineIcon}
            airlineName={bookingFlightDetails.airlineName}
          />
          <span className="text-neutral-500 text-base mb-2">
            {bookingFlightDetails.departureCity} -{" "}
            {bookingFlightDetails.arrivalCity}
          </span>
          <div className="flex items-center gap-2 mb-4">
            <img src={flightArrivalIcon} />
            <span className="text-[#FF912BFF]">
              {bookingFlightDetails.classType}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-neutral-900 font-semibold">
              {bookingFlightDetails.flightDepartureTime} -{" "}
              {bookingFlightDetails.flightArrivalTime}
            </span>
            <div className="flex gap-1 items-center">
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
              <span className="text-[#2424FFFF]">
                {calculateDuration(
                  bookingFlightDetails.flightDepartureTime,
                  bookingFlightDetails.flightArrivalTime
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between gap-3">
          <DateContainer
            flightDate={bookingFlightDetails.flightDepartureDate}
          />
          <div className="space-y-3">
            <div className="relative w-16 h-[1px] mr-2 bg-neutral-400">
              <div className="absolute bottom-[3px] top-[-3px] left-[-3px] w-2 h-2 bg-[#11D396FF] rounded-full"></div>
              <div className="absolute bottom-[3px] top-[-3px] left-[100%] w-2 h-2 bg-[#11D396FF] rounded-full"></div>
            </div>
            <div className="flex gap-2 items-center">
              <svg
                className="w-4 h-4"
                fill="#6C6CFFFF"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M2.5 19h19v2h-19v-2zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43l-1.93.51l4.14 7.17l-4.97 1.33l-1.97-1.54l-1.45.39l2.59 4.49L21 11.49c.81-.23 1.28-1.05 1.07-1.85z" />
              </svg>
              <span className="text-[#2424FFFF] ">Direct</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-solid border-neutral-300 mb-3" />
      <div className="flex flex-col gap-2">
        {bookingFlightDetails.isRefundable && (
          <div className="flex items-center gap-2">
            <img src={dollarIcon} />
            <span className="text-[#0EA776FF] font-medium">Refundable</span>
          </div>
        )}
        {bookingFlightDetails.isRescheduleAvailabe && (
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
            >
              <path
                fill="#11D396FF"
                d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z"
              />
            </svg>
            <span className="text-[#0EA776FF] font-medium">
              Reschedule Available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingFlightDetails;
