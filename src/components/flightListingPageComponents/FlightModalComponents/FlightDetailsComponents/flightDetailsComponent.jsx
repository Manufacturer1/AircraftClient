import FlightDuration from "./flightDurationComponent";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const FlightDetails = ({ flightDetails }) => {
  const getDepartureTime = () => {
    const departureTime = flightDetails.departureTime;
    return departureTime || "00:00";
  };
  const getArrivalTime = () => {
    const arrivalTime = flightDetails.arrivalTime;

    return arrivalTime || "00:00";
  };

  return (
    <div className="w-full">
      <Tooltip
        id="amenity-tooltip"
        className="z-50 custom-tooltip"
        place="top"
        effect="solid"
      />
      <div className="flex w-full">
        {/*Flght duration representation*/}
        <div className="w-[20%]">
          <FlightDuration
            departureTime={getDepartureTime()}
            arrivalTime={getArrivalTime()}
          />
        </div>
        {/*Flight info*/}
        <div className="flex flex-col justify-between w-[80%]">
          <div className="flex flex-col gap-1">
            <h3 className="font-medium text-xl text-neutral-800">
              {flightDetails.origin}{" "}
              <span>({flightDetails.originAirport.code})</span>
            </h3>
            <span className="text-base text-neutral-500">
              {flightDetails.originAirport.name}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 items-center content-between">
              <div className="flex items-center gap-1">
                <svg
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                >
                  <rect fill="none" height="256" width="256" />
                  <line
                    fill="none"
                    stroke="#0EA776FF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="18"
                    x1="96"
                    x2="96"
                    y1="56"
                    y2="200"
                  />
                  <path
                    d="M24,167.2a7.9,7.9,0,0,1,6.4-7.8,32.1,32.1,0,0,0,0-62.8A7.9,7.9,0,0,1,24,88.8V64a8,8,0,0,1,8-8H224a8,8,0,0,1,8,8V88.8a7.9,7.9,0,0,1-6.4,7.8,32.1,32.1,0,0,0,0,62.8,7.9,7.9,0,0,1,6.4,7.8V192a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8Z"
                    fill="none"
                    stroke="#0EA776FF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="18"
                  />
                </svg>
                <span className="text-[#0EA776FF] text-base font-medium flex items-center gap-4">
                  {flightDetails.flightNumber}
                  <div className="w-1.5 h-1.5 bg-[#11D396FF] rounded-full"></div>
                  <span className="font-normal">{flightDetails.classType}</span>
                </span>
              </div>
              <div className="flex gap-4">
                {flightDetails.amenities.length > 0 &&
                  flightDetails.amenities.map((item, index) => {
                    return (
                      <button
                        key={index}
                        className="w-8 h-8 flex items-center justify-center bg-[#11D396FF] rounded-full 
                                 hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF] transition-all duration-150"
                        data-tooltip-id="amenity-tooltip"
                        data-tooltip-content={item.description || item.name}
                      >
                        <img
                          className="block w-5 h-5"
                          src={item.amenityIcon}
                          alt={item.name}
                        />
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="grid grid-cols-2 content-between">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <svg
                    enableBackground="new 0 0 512 512"
                    height="25px"
                    id="Layer_3"
                    version="1.1"
                    viewBox="0 0 512 512"
                    width="25px"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g fill="#0EA776FF">
                      <path d="M408.9,158.6h-35.3c-0.3-3-2.9-5.3-6-5.3h-42.6c-3.3,0-6,2.7-6,6v0.2c-0.9-0.5-2-0.9-3.1-0.9h-9.8v-19.1    c0-12.3-10-22.3-22.3-22.3H228c-12.3,0-22.3,10-22.3,22.3v19.1h-11.3c-0.8,0-1.6,0.2-2.3,0.5c-0.1-3.2-2.7-5.8-6-5.8h-42.6    c-3.1,0-5.6,2.3-6,5.3h-34.6c-3.3,0-6,2.7-6,6V382c0,3.3,2.7,6,6,6h34.5v0.8c0,3.3,2.7,6,6,6h42.6c3.3,0,6-2.7,6-6v-1.2    c0.7,0.3,1.5,0.5,2.3,0.5H316c1.1,0,2.2-0.3,3.1-0.9v1.6c0,3.3,2.7,6,6,6h42.6c3.3,0,6-2.7,6-6V388h35.2c3.3,0,6-2.7,6-6V164.6    C414.9,161.3,412.2,158.6,408.9,158.6z M109.1,376V170.6h28.5V376H109.1z M180.2,382.8h-30.6V165.2h30.6V382.8z M217.8,139.5    c0-5.7,4.6-10.3,10.3-10.3H284c5.7,0,10.3,4.6,10.3,10.3v19.1h-76.4V139.5z M316,376H194.5c-0.8,0-1.6,0.2-2.3,0.5V170.1    c0.7,0.3,1.5,0.5,2.3,0.5h17.3h88.4H316c1.1,0,2.2-0.3,3.1-0.9v207.2C318.2,376.3,317.1,376,316,376z M361.7,382.8h-30.6V165.2    h30.6V382.8z M402.9,376h-29.2V170.6h29.2V376z" />
                    </g>
                  </svg>
                  <span className="text-[#0EA776FF] font-normal flex items-center gap-4">
                    Baggage
                    <div className="w-1.5 h-1.5 bg-[#11D396FF] rounded-full"></div>
                    <span className="text-neutral-600 text-base">
                      {flightDetails.baggage.freeCheckedBags} x{" "}
                      {flightDetails.baggage.checkedWeightLimitKg} kg
                    </span>
                  </span>
                </div>

                <span className="text-[#0EA776FF] font-normal flex items-center gap-4 ml-6">
                  Cabin Baggage
                  <div className="w-1.5 h-1.5 bg-[#11D396FF] rounded-full"></div>
                  <span className="text-neutral-600 text-base">
                    {flightDetails.baggage.freeCabinBags} x{" "}
                    {flightDetails.baggage.cabinWeightLimitKg}
                    {" kg"}
                  </span>
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center">
                  <svg
                    enableBackground="new 0 0 512 512"
                    height="25px"
                    id="Layer_3"
                    version="1.1"
                    viewBox="0 0 512 512"
                    width="25px"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g fill="#0EA776FF">
                      <path d="M408.9,158.6h-35.3c-0.3-3-2.9-5.3-6-5.3h-42.6c-3.3,0-6,2.7-6,6v0.2c-0.9-0.5-2-0.9-3.1-0.9h-9.8v-19.1    c0-12.3-10-22.3-22.3-22.3H228c-12.3,0-22.3,10-22.3,22.3v19.1h-11.3c-0.8,0-1.6,0.2-2.3,0.5c-0.1-3.2-2.7-5.8-6-5.8h-42.6    c-3.1,0-5.6,2.3-6,5.3h-34.6c-3.3,0-6,2.7-6,6V382c0,3.3,2.7,6,6,6h34.5v0.8c0,3.3,2.7,6,6,6h42.6c3.3,0,6-2.7,6-6v-1.2    c0.7,0.3,1.5,0.5,2.3,0.5H316c1.1,0,2.2-0.3,3.1-0.9v1.6c0,3.3,2.7,6,6,6h42.6c3.3,0,6-2.7,6-6V388h35.2c3.3,0,6-2.7,6-6V164.6    C414.9,161.3,412.2,158.6,408.9,158.6z M109.1,376V170.6h28.5V376H109.1z M180.2,382.8h-30.6V165.2h30.6V382.8z M217.8,139.5    c0-5.7,4.6-10.3,10.3-10.3H284c5.7,0,10.3,4.6,10.3,10.3v19.1h-76.4V139.5z M316,376H194.5c-0.8,0-1.6,0.2-2.3,0.5V170.1    c0.7,0.3,1.5,0.5,2.3,0.5h17.3h88.4H316c1.1,0,2.2-0.3,3.1-0.9v207.2C318.2,376.3,317.1,376,316,376z M361.7,382.8h-30.6V165.2    h30.6V382.8z M402.9,376h-29.2V170.6h29.2V376z" />
                    </g>
                  </svg>
                  <span className="text-[#0EA776FF] font-normal flex items-center gap-4">
                    {flightDetails.plane.name}
                    <div className="w-1.5 h-1.5 bg-[#11D396FF] rounded-full"></div>
                    <span className="text-neutral-600 text-base">
                      {flightDetails.plane.model}
                    </span>
                  </span>
                </div>

                <span className="text-neutral-500 font-normal flex items-center gap-4 ml-6">
                  <span className="text-neutral-600 text-base">
                    {flightDetails.plane.seatLayout} seat layout
                  </span>
                </span>
                <span className="ml-6 text-neutral-500">
                  {flightDetails.plane.seatPitch} inches Seat pitch (standart)
                </span>
              </div>
            </div>
          </div>
          <div className="mb-[-30px]">
            <h3 className="font-medium text-xl text-neutral-800">
              {flightDetails.destination}{" "}
              <span>({flightDetails.destinationAirport.code})</span>
            </h3>
            <span className="text-base text-neutral-500 ">
              {flightDetails.destinationAirport.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
