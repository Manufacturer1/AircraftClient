import bagIcon from "../../../images/bagIcon.svg";
import flightDepartureIcon from "../../../images/flightDeparture.svg";
import timeLapseIcon from "../../../images/timeLapseIcon.svg";

const FlightComponent = ({
  airlineIcon,
  airlineBgColor,
  airlineName,
  bagCapacity,
  flightDepartureTime,
  flightArrivalTime,
  flightPrice,
  stopsNumber = 0,
  handleModalOpen,
  onSelect,
  index,
}) => {
  const handleChooseClick = () => {
    handleModalOpen();
    onSelect(index);
  };

  const calculateDuration = (departure, arrival) => {
    const [depHours, depMinutes] = departure.split(":").map(Number);
    const [arrHours, arrMinutes] = arrival.split(":").map(Number);

    let depTotalMinutes = depHours * 60 + depMinutes;
    let arrTotalMinutes = arrHours * 60 + arrMinutes;

    let diff = arrTotalMinutes - depTotalMinutes;
    if (diff < 0) diff += 24 * 60;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}h ${minutes}m`;
  };
  const parseTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="border-b-2 border-solid pb-12 px-4 pt-2">
      <div className="grid grid-cols-4 items-center">
        <div className="flex gap-5 items-center">
          <div
            className={`${airlineBgColor} h-10 w-10 rounded flex items-center justify-center`}
          >
            <img src={airlineIcon} alt="airline icon" />
          </div>
          <div className="flex flex-col items-start">
            <h4 className="text-base font-medium text-neutral-700">
              {airlineName}
            </h4>
            <div className="flex items-center gap-1">
              <img src={bagIcon} />
              <small className="text-neutral-900 font-normal text-sm">
                {bagCapacity}kg
              </small>
            </div>
          </div>
        </div>

        {/* Flight Hours */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <span className="text-neutral-900 font-semibold text-xl">
              {parseTime(flightDepartureTime)} - {parseTime(flightArrivalTime)}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <img
              className="block w-4"
              src={timeLapseIcon}
              alt="Duration icon"
            />
            <span className="text-neutral-700 font-normal text-base">
              {calculateDuration(flightDepartureTime, flightArrivalTime)}
            </span>
          </div>
        </div>

        {/*Flight Stops*/}
        <div className="flex flex-col justify-center items-center mt-3">
          <div className="relative w-32 h-0 border-[1px] border-[#BCC1CAFF] border-solid ">
            <div className="absolute top-[-4px] left-[-2px] w-2 h-2 bg-[#11D396FF] rounded-full"></div>
            <div className="absolute top-[-4px] left-[100%] w-2 h-2 bg-[#11D396FF] rounded-full"></div>
          </div>

          <img
            className="w-5 block translate-y-5 translate-x-[-40px]"
            src={flightDepartureIcon}
            alt="Departure plane icon"
          />
          {stopsNumber > 0 ? (
            <span className="text-base text-neutral-700">
              {stopsNumber === 1
                ? `${stopsNumber}` + " Stop"
                : `${stopsNumber}` + " Stops"}
            </span>
          ) : (
            <span className="text-base text-neutral-700">Direct</span>
          )}
        </div>

        {/*Fligh Price */}
        <div className="flex flex-col gap-4 mt-4">
          <span className="text-xl font-semibold self-end text-[#FF912BFF] flex items-center gap-2">
            {flightPrice} USD{" "}
            <small className="text-neutral-500 text-base font-normal">
              / pax
            </small>
          </span>
          <button
            onClick={handleChooseClick}
            className="h-9 w-20 self-end
           text-neutral-700 
           font-normal bg-white rounded-[4px] 
           border-2 border-solid border-neutral-700
           hover:text-neutral-800 hover:active:text-neutral-900"
          >
            Choose
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightComponent;
