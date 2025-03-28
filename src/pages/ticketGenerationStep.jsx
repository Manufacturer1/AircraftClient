import cloudIcon from "../images/soundCloud.svg";
import Ticket from "../components/ticketComponent";
const ticketInfo = [
  {
    airlineIcon: cloudIcon,
    airlineBgColor: "bg-[#0D78C9FF]",
    airlineName: "Cloudy Airlines",
    classType: "Economy",
    bags: 2,
    bagCapacity: 23,
    cabinBags: 1,
    cabinBagsCapacity: 7,
    passengerName: "Anna Anderson",
    flightDepartureTime: "01:19 PM",
    flightArrivalTime: "02:00 PM",
    flightDepartureDate: "09/02/2023",
    flightArrivalDate: "10/02/2023",
    departureCity: "Houston (HOU)",
    arrivalCity: "Las Vegas (LAS)",
    checkInDate: "9th Feb 2023 at 12:30",
    bookingId: "65980165",
    airlineBookingCode: "CA-6018",
  },
  {
    airlineIcon: cloudIcon,
    airlineBgColor: "bg-[#0D78C9FF]",
    airlineName: "Cloudy Airlines",
    classType: "Economy",
    bags: 2,
    bagCapacity: 23,
    cabinBags: 1,
    cabinBagsCapacity: 7,
    passengerName: "Anna Anderson",
    flightDepartureTime: "02:00 PM",
    flightArrivalTime: "02:45 PM",
    flightDepartureDate: "10/02/2023",
    flightArrivalDate: "10/02/2023",
    departureCity: "Las Vegas (LAS)",
    arrivalCity: "Los Angeles (LAS)",
    checkInDate: "10th Feb 2023 at 01:55",
    bookingId: "59952235",
    airlineBookingCode: "CA-5923",
  },
];

const TicketStep = () => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7">
          <svg
            viewBox="0 0 32 32"
            fill="#6C6CFFFF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title />
            <g data-name="Layer 51" id="Layer_51">
              <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
              <path d="M23.29,10.29,14,19.59l-5.29-5.3a1,1,0,1,0-1.42,1.42l6,6a1,1,0,0,0,1.42,0l10-10a1,1,0,0,0-1.42-1.42Z" />
            </g>
          </svg>
        </div>
        <h2 className="text-[#6C6CFFFF] font-semibold text-xl">
          Your flight is booked successfully!
        </h2>
      </div>
      <p className="text-neutral-600 mb-10">
        Present E-ticket and valid indentification at check-in
      </p>
      {/*Generated tickets*/}
      <div className="mb-10 flex flex-col gap-10">
        <Ticket ticketInfo={ticketInfo[0]} />
        <Ticket ticketInfo={ticketInfo[1]} />
      </div>
    </section>
  );
};

export default TicketStep;
