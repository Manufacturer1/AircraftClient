import { useState } from "react";
import calendarIcon from "../images/calendarIcon.svg";
import FlightComponent from "../components/flightComponent";
import windPowerIcon from "../images/windPowerIcon.svg";
import cactusIcon from "../images/cactus.svg";
import forestIcon from "../images/forest.svg";
import cloudIcon from "../images/soundCloud.svg";

import PriceHistory from "./priceHistoryComponent";

const datesData = [
  { date: "Fri, 16 Feb", price: "148 USD" },
  { date: "Sat, 17 Feb", price: "160 USD" },
  { date: "Sun, 18 Feb", price: "170.8 USD" },
  { date: "Mon, 19 Feb", price: "150 USD" },
  { date: "Tue, 20 Feb", price: "146.5 USD" },
];

const flightsInfo = [
  {
    airlineIcon: windPowerIcon,
    airlineBgColor: "bg-[#6ECFBDFF]",
    airlineName: "HorizonJet",
    bagCapacity: 23,
    flightDepartureTime: "10:25 PM",
    flightArrivalTime: "07:06 AM",
    flightPrice: 275.5,
    stopsNumber: 1,
  },
  {
    airlineIcon: forestIcon,
    airlineBgColor: "bg-[#FF912BFF]",
    airlineName: "Altitude Airways",
    bagCapacity: 23,
    flightDepartureTime: "06:30 AM",
    flightArrivalTime: "07:55 AM",
    flightPrice: 206,
    stopsNumber: 1,
  },
  {
    airlineIcon: cloudIcon,
    airlineBgColor: "bg-[#0D78C9FF]",
    airlineName: "Cloudy Airlines",
    bagCapacity: 23,
    flightDepartureTime: "01:19 PM",
    flightArrivalTime: "02:45 PM",
    flightPrice: 148.5,
    stopsNumber: 1,
  },
  {
    airlineIcon: cloudIcon,
    airlineBgColor: "bg-[#0D78C9FF]",
    airlineName: "Cloudy Airlines",
    bagCapacity: 23,
    flightDepartureTime: "06:13 PM",
    flightArrivalTime: "07:40 PM",
    flightPrice: 380.15,
    stopsNumber: 1,
  },
  {
    airlineIcon: forestIcon,
    airlineBgColor: "bg-[#FF912BFF]",
    airlineName: "Altitude Airways",
    bagCapacity: 23,
    flightDepartureTime: "06:20 AM",
    flightArrivalTime: "07:46 AM",
    flightPrice: 269.1,
    stopsNumber: 2,
  },
  {
    airlineIcon: windPowerIcon,
    airlineBgColor: "bg-[#6ECFBDFF]",
    airlineName: "HorizonJet",
    bagCapacity: 23,
    flightDepartureTime: "7:25 PM",
    flightArrivalTime: "08:45 PM",
    flightPrice: 549.1,
    stopsNumber: 0,
  },
  {
    airlineIcon: windPowerIcon,
    airlineBgColor: "bg-[#6ECFBDFF]",
    airlineName: "HorizonJet",
    bagCapacity: 23,
    flightDepartureTime: "06:01 AM",
    flightArrivalTime: "07:28 AM",
    flightPrice: 200.5,
    stopsNumber: 0,
  },
  {
    airlineIcon: cactusIcon,
    airlineBgColor: "bg-[#E5343AFF]",
    airlineName: "FlyScape",
    bagCapacity: 23,
    flightDepartureTime: "08:40 AM",
    flightArrivalTime: "10:00 AM",
    flightPrice: 549.1,
    stopsNumber: 0,
  },
];

const Planner = ({ handleModalOpen }) => {
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
