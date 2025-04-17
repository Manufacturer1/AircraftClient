import { useEffect, useRef, useState } from "react";
import iconCloseModal from "../../../images/closeModal.svg";
import FlightDetails from "./FlightDetailsComponents/flightDetailsComponent";
import InfoAlert from "./FlightDetailsComponents/infoComponent";
import FlightBenefits from "./FlightBenefitsComponents/flightBenefitsComponent";

import { Link } from "react-router-dom";
import {
  FlightDetailsOptionIcon,
  HeartIcon,
} from "../../../utils/iconUtils/iconUtils";

const priceDetails = {
  tax: true,
  totalPrice: 150.0,
  discount: 1.5,
  adultFee: 150.0,
};
const modalOptions = [
  {
    icon: <FlightDetailsOptionIcon />,
    option: "Flight details",
  },
  {
    icon: <HeartIcon />,
    option: "Benefits",
  },
];

const FlightModal = ({ openModal, setModalOpen, flightDetails }) => {
  const createFlightDetails = (itinerary, flightInfo) => {
    const { flights, ...rest } = itinerary;
    const { ...flight } = flightInfo;
    return {
      ...rest,
      ...flight,
    };
  };
  const modalRef = useRef(null);
  const [option, setOption] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };
    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  return (
    <>
      {/*Modal Overlay*/}
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full z-10 bg-neutral-900 transition-opacity duration-300 opacity-50"></div>
      )}
      {/*Modal*/}
      <div
        ref={modalRef}
        className={`flex flex-col fixed top-0 right-0
           w-[47%] h-full bg-white z-20 
           shadow-lg transition-transform
            duration-300 
            
            overflow-y-scroll
            ${openModal ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Modal Header*/}
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3 ">
            <div
              className={`${flightDetails.airlineBgColor} h-10 w-10 rounded flex items-center justify-center`}
            >
              <img src={flightDetails.airlineIcon} />
            </div>
            <span className="font-semibold text-neutral-700 text-base">
              {flightDetails.airlineName}
            </span>
          </div>
          <img
            onClick={() => setModalOpen(false)}
            className="cursor-pointer"
            src={iconCloseModal}
            alt="close modal icon"
          />
        </div>
        {/*Modal options*/}
        <div className="flex gap-12 mb-5 p-4 pb-0">
          {modalOptions.map((item, index) => (
            <div
              onClick={() => setOption(index)}
              className="flex items-center gap-2 cursor-pointer group"
              key={index}
            >
              <div
                className={`w-5 ${
                  option == index
                    ? "text-[#11D396FF]"
                    : "text-[#565E6CFF] group-hover:text-neutral-900 transition-all duration-150"
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-base ${
                  option == index
                    ? "font-bold text-[#11D396FF]"
                    : "text-[#565E6CFF] font-normal group-hover:text-neutral-900 transition-all duration-150"
                }`}
              >
                {item.option}
              </span>
            </div>
          ))}
        </div>
        {/*Flight details section*/}

        {option === 0 && (
          <div className="flex flex-col gap-16 mb-5 bg-[#FAFAFBFF] p-4 pb-14">
            {flightDetails.flights.map((flight, index) => (
              <div key={index}>
                <FlightDetails
                  flightDetails={createFlightDetails(flightDetails, flight)}
                />

                {index < flightDetails.flights.length - 1 && (
                  <div className="mt-14 mb-0">
                    <InfoAlert
                      city={flight.destination}
                      time={
                        flightDetails.hasStops ? flightDetails.stopTime : ""
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {/*Flight benefits*/}
        {option === 1 && (
          <div className="p-4 bg-[#F8F9FAFF]">
            <FlightBenefits
              flightDetails={flightDetails}
              priceDetails={priceDetails}
            />
          </div>
        )}

        {/* Price and book button*/}
        <div className="flex justify-between items-center p-4 mt-auto">
          <h2 className="flex items-center gap-1 font-semibold text-2xl text-[#FF912BFF]">
            ${flightDetails.flightPrice}
            <span className="text-neutral-400 text-lg font-normal">/ pax</span>
          </h2>
          <div className="flex items-center gap-4">
            <Link
              to="/booking"
              className="text-white
             w-32 h-11 bg-[#11D396FF]
             rounded-[28px] text-lg
             flex items-center
             justify-center
             hover:bg-[#0FBE86FF]
             hover:active:bg-[#0EA776FF]
             transition-all duration-150
             "
            >
              Book now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightModal;
