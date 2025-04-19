import AirlineIcon from "../../generalUseComponents/airlineIconComponent";
import flightArrivalIcon from "../../../images/flightArrival.svg";
import DateContainer from "./dateContainerComponent";
import dollarIcon from "../../../images/dollar.svg";
import { tripTypeToLabel } from "../../../utils/flightUtils/flightUtils";

const BookingFlightDetails = ({ bookingFlightDetails }) => {
  const parseTime = (timeString) => {
    if (!timeString) return 0;

    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const calculateDuration = (departure, arrival) => {
    const depMinutes = parseTime(departure);
    const arrMinutes = parseTime(arrival);

    if (isNaN(depMinutes) || isNaN(arrMinutes)) return "N/A";

    let diff = arrMinutes - depMinutes;

    if (diff < 0) diff += 24 * 60;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
  };
  const formatDisplayTime = (timeString) => {
    if (!timeString) return "--:--";
    return timeString.split(":").slice(0, 2).join(":");
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
            {bookingFlightDetails.origin} - {bookingFlightDetails.destination}
          </span>
          <div className="flex items-center gap-2 mb-4">
            <img src={flightArrivalIcon} />
            <span className="text-[#FF912BFF]">
              {bookingFlightDetails.classType}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-neutral-900 font-semibold">
              {formatDisplayTime(bookingFlightDetails.departureTime)} -{" "}
              {formatDisplayTime(bookingFlightDetails.arrivalTime)}
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
                  bookingFlightDetails.departureTime,
                  bookingFlightDetails.arrivalTime
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between gap-3">
          <DateContainer flightDate={bookingFlightDetails.departureDate} />
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
      <div className="flex items-center gap-3">
        <div className="text-[#0EA776FF] w-6 h-6">
          {bookingFlightDetails.tripType === "OneWay" ? (
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <title />
              <g data-name="Layer 2" id="Layer_2">
                <path
                  d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z"
                  fill="#11D396FF"
                />
              </g>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="#686583"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"
                fill="#11D396FF"
              />
            </svg>
          )}
        </div>

        <span className="text-[#0EA776FF] text-base font-medium">
          {tripTypeToLabel[bookingFlightDetails.tripType]}
        </span>
      </div>
      <div className="flex items-center">
        <img
          className="w-5 h-5"
          src={dollarIcon}
          alt="dollar icon for refundable"
        />
        <span className="text-[#0EA776FF] text-base font-medium">
          {bookingFlightDetails.finalPrice} / pax
        </span>
      </div>
    </div>
  );
};

export default BookingFlightDetails;
