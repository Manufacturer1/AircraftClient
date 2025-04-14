import { useState } from "react";
import calendarIcon from "../../../images/calendarIcon.svg";
import FlightComponent from "../plannerComponents/flightComponent";
import LoadingSpinner from "../../generalUseComponents/loadingSpinner";

const Planner = ({
  handleModalOpen,
  flightsInfo,
  onFlightSelect,
  selectedIndex,
  setSelectedIndex,
  schedule,
  onDateSelect,
  loading,
}) => {
  const handleFlightSelect = (index) => {
    onFlightSelect(index);
  };
  const handlePlannerSelect = (index) => {
    const date = schedule[index].date;

    if (onDateSelect) {
      onDateSelect(date);
    }
    setSelectedIndex(index);
  };

  return (
    <div>
      {/* Date Tabs */}
      <div className="w-full bg-[#0EA776] h-20 rounded-t-md px-4 mb-4">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_50px_50px] items-center h-full mb-4">
          {schedule.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handlePlannerSelect(index)}
                className={`flex flex-col items-center justify-center mt-auto text-center h-[4.4rem] cursor-pointer transition-all duration-150 ${
                  selectedIndex === index
                    ? "bg-white text-[#0EA776] rounded-t-md font-medium"
                    : "text-[#B0F9E2] font-normal"
                }`}
              >
                <span>{item.date}</span>
                <span>{item.price}</span>
              </div>
            );
          })}

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
      <>
        {/* Flight Component */}
        {loading ? (
          <LoadingSpinner />
        ) : flightsInfo.length > 0 ? (
          <div className="mb-5">
            {flightsInfo.map((flight, index) => {
              return (
                <div key={index}>
                  <FlightComponent
                    {...flight}
                    index={index}
                    handleModalOpen={handleModalOpen}
                    onSelect={handleFlightSelect}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-6">
            No flights found for your search. Please try different criteria.
          </div>
        )}
      </>
    </div>
  );
};
export default Planner;
