import { useState } from "react";
import calendarIcon from "../images/calendarIcon.svg";
import FlightComponent from "../components/flightComponent";


import PriceHistory from "./priceHistoryComponent";

const datesData = [
  { date: "Fri, 16 Feb", price: "148 USD" },
  { date: "Sat, 17 Feb", price: "160 USD" },
  { date: "Sun, 18 Feb", price: "170.8 USD" },
  { date: "Mon, 19 Feb", price: "150 USD" },
  { date: "Tue, 20 Feb", price: "146.5 USD" },
];

const Planner = ({ handleModalOpen, flightsInfo }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <div className="w-full bg-[#0EA776] h-20 rounded-t-md px-4 mb-4">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_50px_50px] items-center h-full mb-4">
          {/* Date Tabs */}
          {datesData.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex flex-col items-center justify-center mt-auto text-center h-[4.4rem] cursor-pointer transition-all duration-150 ${
                selectedIndex === index
                  ? "bg-white text-[#0EA776] rounded-t-md font-medium"
                  : "text-[#B0F9E2] font-normal"
              }`}
            >
              <span>{item.date}</span>
              <span>{item.price}</span>
            </div>
          ))}

          {/* Divider */}
          <div className="flex justify-center items-center h-full">
            <hr className="w-[1px] h-full bg-white border-none" />
          </div>

          {/* Calendar Icon */}
          <div className="flex justify-center items-center h-full">
            <img
              src={calendarIcon}
              alt="Calendar"
              className="w-6 h-6 filter brightness-0 invert cursor-pointer"
            />
          </div>
        </div>
      </div>
      {/*Flight Component */}
      <div className="mb-5">
        {flightsInfo
          .filter((_, i) => i < 3)
          .map((flight, index) => (
            <div key={index}>
              <FlightComponent
                airlineIcon={flight.airlineIcon}
                airlineBgColor={flight.airlineBgColor}
                airlineName={flight.airlineName}
                bagCapacity={flight.bagCapacity}
                flightDepartureTime={flight.flightDepartureTime}
                flightArrivalTime={flight.flightArrivalTime}
                flightPrice={flight.flightPrice}
                stopsNumber={flight.stopsNumber}
                handleModalOpen={handleModalOpen}
              />
            </div>
          ))}
      </div>
      {/*Price history component*/}
      <div className="mb-4">
        <PriceHistory />
      </div>
      {/*Typical flights */}
      <div className="h-full">
        {flightsInfo
          .filter((_, i) => i >= 3)
          .map((flight, index) => (
            <div key={index}>
              <FlightComponent
                airlineIcon={flight.airlineIcon}
                airlineBgColor={flight.airlineBgColor}
                airlineName={flight.airlineName}
                bagCapacity={flight.bagCapacity}
                flightDepartureTime={flight.flightDepartureTime}
                flightArrivalTime={flight.flightArrivalTime}
                flightPrice={flight.flightPrice}
                stopsNumber={flight.stopsNumber}
                handleModalOpen={handleModalOpen}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Planner;
