import checkIcon from "../images/check.svg";
import simpleCheckIcon from "../images/simpleCheck.svg";
import removeIcon from "../images/negativeReschedule.svg";
import AirlineIcon from "./airlineIconComponent";
import flightArrivalIcon from "../images/flightArrival.svg";

const RescheduleDetails = ({ rescheduleInfo }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <AirlineIcon
          airlineBgColor={rescheduleInfo.airlineBgColor}
          airlineIcon={rescheduleInfo.airlineIcon}
          airlineName={rescheduleInfo.airlineName}
        />
        {rescheduleInfo.rescheduleAvailabe && (
          <button className="flex items-center justify-center gap-2 rounded-[22px] bg-white w-32 h-11">
            <img className="w-7" src={checkIcon} />
            <span className="text-[#1DD75BFF]">Available</span>
          </button>
        )}
      </div>
      <p className="text-base font-normal text-neutral-600 mb-3">
        {rescheduleInfo.departureCity} - {rescheduleInfo.arrivalCity}
      </p>
      <div className="flex gap-2 mb-6">
        <img src={flightArrivalIcon} alt="flight arrival sign" />
        <span className="text-[#FF912BFF] font-normal text-base">
          {rescheduleInfo.classType}
        </span>
      </div>
      <hr className="text-neutral-300 mb-5" />
      <h3 className="text-neutral-600 mb-2">You'll be able to change your</h3>
      {/*Departure reason */}
      <div className="flex flex-col gap-1 mb-4">
        {Object.entries(rescheduleInfo.optionsToChange).map(
          ([option, isEnabled], index) => (
            <span key={index} className="flex items-center gap-2">
              <img
                src={isEnabled ? simpleCheckIcon : removeIcon}
                alt={option}
                className="w-5 h-5"
              />
              <span
                className={`${
                  isEnabled ? "text-[#0EA776FF]" : "text-[#DE3B40FF]"
                }`}
              >
                {option}
              </span>
            </span>
          )
        )}
      </div>
      {/*Reschedule guids*/}
      <ul className="space-y-2 mb-3">
        {rescheduleInfo.rescheduleGuides.map((guide, index) => (
          <li key={index} className="flex gap-3 items-start">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-neutral-900 font-normal text-base">
              {guide}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RescheduleDetails;
