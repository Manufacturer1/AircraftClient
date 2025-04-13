import { useState } from "react";
import calendarIcon from "../../../images/calendarIcon.svg";
import FlightComponent from "../plannerComponents/flightComponent";
import { format } from "date-fns";
import LoadingSpinner from "../../generalUseComponents/loadingSpinner";

import PriceHistory from "../plannerComponents/priceHistoryComponent";

const datesData = [
  { date: format(new Date(), "EEE, d MMM"), price: "148 USD" },
  {
    date: format(new Date().setDate(new Date().getDate() + 1), "EEE, d MMM"),
    price: "160 USD",
  },
  {
    date: format(new Date().setDate(new Date().getDate() + 2), "EEE, d MMM"),
    price: "170.8 USD",
  },
  {
    date: format(new Date().setDate(new Date().getDate() + 3), "EEE, d MMM"),
    price: "150 USD",
  },
  {
    date: format(new Date().setDate(new Date().getDate() + 4), "EEE, d MMM"),
    price: "146.5 USD",
  },
];

const Planner = ({
  handleModalOpen,
  flightsInfo,
  isLoading = false,
  onFlightSelect,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleFlightSelect = (index) => {
    onFlightSelect(index);
  };

  return (
    <div>
      {/* Date Tabs */}
      <div className="w-full bg-[#0EA776] h-20 rounded-t-md px-4 mb-4">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_50px_50px] items-center h-full mb-4">
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

          <div className="flex justify-center items-center h-full">
            <hr className="w-[1px] h-full bg-white border-none" />
          </div>

          <div className="flex justify-center items-center h-full">
            <img
              src={calendarIcon}
              alt="Calendar"
              className="w-6 h-6 filter brightness-0 invert cursor-pointer"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Flight Component */}
          <div className="mb-5">
            {flightsInfo.map((flight, index) => (
              <div key={index}>
                <FlightComponent
                  {...flight}
                  index={index}
                  handleModalOpen={handleModalOpen}
                  onSelect={handleFlightSelect}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Planner;
