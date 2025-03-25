import { useEffect, useRef, useState } from "react";
import iconCloseModal from "../images/closeModal.svg";
import FlightDetails from "./flightDetailsComponent";
import cutleryIcon from "../images/cutlery.svg";
import videoPlayerIcon from "../images/videoplayer.svg";
import usbIcon from "../images/usb.svg";
import InfoAlert from "./infoComponent";
import shareIcon from "../images/share.svg";
import FlightBenefits from "./flightBenefitsComponent";

const travelInfo = [
  {
    departureCity: "Houston (HOU)",
    arrivalCity: "Las Vegas (LAS)",
    departureAirport: "George Bush Intercontinental Airport, Houston",
    arrivalAirport: "McCarran International Airport, Las Vegas",
    ticketNumber: "CA-6018",
    classType: "Economy",
    cabinBagsNr: 1,
    cabingBagsCapacity: 7,
    baggageNr: 2,
    plane: "Airbus",
    planeModel: "A320",
    seatLayout: "3-3",
    seatPitchInches: 29,
    seatType: "standard",
    hasAmenities: false,
  },
  {
    departureCity: "Las Vegas (LAS)",
    arrivalCity: "Los Angeles (LAX)",
    departureAirport: "McCarran International Airport, Las Vegas",
    arrivalAirport: "Los Angeles International Airport",
    ticketNumber: "CA-6291",
    classType: "Economy",
    cabinBagsNr: 1,
    cabingBagsCapacity: 7,
    baggageNr: 2,
    plane: "Airbus",
    planeModel: "A320",
    seatLayout: "3-3-3",
    seatPitchInches: 32,
    seatType: "standard",
    hasAmenities: true,
    amenities: [cutleryIcon, videoPlayerIcon, usbIcon],
  },
];

const priceDetails = {
  tax: true,
  totalPrice: 150.0,
  discount: 1.5,
  adultFee: 150.0,
};

const FlightModal = ({ openModal, setModalOpen, flightDetails }) => {
  const modalRef = useRef(null);
  const [option, setOption] = useState(0);

  const benefits = [
    {
      refundable: true,
      reschedule: true,
      classType: travelInfo[0].classType,
      departureCity: travelInfo[0].departureCity,
      arrivalCity: travelInfo[0].arrivalCity,
      airlineIcon: flightDetails.airlineIcon,
      airlineBgColor: flightDetails.airlineBgColor,
      airlineName: flightDetails.airlineName,
    },
    {
      refundable: true,
      reschedule: true,
      classType: travelInfo[1].classType,
      departureCity: travelInfo[1].departureCity,
      arrivalCity: travelInfo[1].arrivalCity,
      airlineIcon: flightDetails.airlineIcon,
      airlineBgColor: flightDetails.airlineBgColor,
      airlineName: flightDetails.airlineName,
    },
  ];

  const modalOptions = [
    {
      icon: (
        <svg
          style={{ enableBackground: "new 0 0 16 16" }}
          className="fill-current"
          version="1.1"
          viewBox="0 0 16 16"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
        >
          <g id="Guide" />
          <g id="Layer_2">
            <g>
              <path d="M8,2C4.69,2,2,4.69,2,8s2.69,6,6,6s6-2.69,6-6S11.31,2,8,2z M8,13c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5 S10.76,13,8,13z" />
              <path d="M8,6.85c-0.28,0-0.5,0.22-0.5,0.5v3.4c0,0.28,0.22,0.5,0.5,0.5s0.5-0.22,0.5-0.5v-3.4C8.5,7.08,8.28,6.85,8,6.85z" />
              <path d="M8.01,4.8C7.75,4.78,7.51,5.05,7.5,5.32c0,0.01,0,0.07,0,0.08c0,0.27,0.21,0.47,0.49,0.48c0,0,0.01,0,0.01,0 c0.27,0,0.49-0.24,0.5-0.5c0-0.01,0-0.11,0-0.11C8.5,4.98,8.29,4.8,8.01,4.8z" />
            </g>
          </g>
        </svg>
      ),
      option: "Flight details",
    },
    {
      icon: (
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          className="fill-current"
        >
          <title />
          <g data-name="Layer 54" id="Layer_54">
            <path d="M16,28.72a3,3,0,0,1-2.13-.88L3.57,17.54a8.72,8.72,0,0,1-2.52-6.25,8.06,8.06,0,0,1,8.14-8A8.06,8.06,0,0,1,15,5.68l1,1,.82-.82h0a8.39,8.39,0,0,1,11-.89,8.25,8.25,0,0,1,.81,12.36L18.13,27.84A3,3,0,0,1,16,28.72ZM9.15,5.28A6.12,6.12,0,0,0,4.89,7a6,6,0,0,0-1.84,4.33A6.72,6.72,0,0,0,5,16.13l10.3,10.3a1,1,0,0,0,1.42,0L27.23,15.91A6.25,6.25,0,0,0,29,11.11a6.18,6.18,0,0,0-2.43-4.55,6.37,6.37,0,0,0-8.37.71L16.71,8.8a1,1,0,0,1-1.42,0l-1.7-1.7a6.28,6.28,0,0,0-4.4-1.82Z" />
          </g>
        </svg>
      ),
      option: "Benefits",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          className="fill-current"
        >
          <g>
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              strokeWidth="1"
              d="M5.671 4.257c3.928-3.219 9.733-2.995 13.4.672 3.905 3.905 3.905 10.237 0 14.142-3.905 3.905-10.237 3.905-14.142 0A9.993 9.993 0 0 1 2.25 9.767l.077-.313 1.934.51a8 8 0 1 0 3.053-4.45l-.221.166 1.017 1.017-4.596 1.06 1.06-4.596 1.096 1.096zM13 6v2h2.5v2H10a.5.5 0 0 0-.09.992L10 11h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2H14a.5.5 0 0 0 .09-.992L14 13h-4a2.5 2.5 0 1 1 0-5h1V6h2z"
            />
          </g>
        </svg>
      ),
      option: "Refund",
    },
    {
      icon: (
        <svg
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
          width="18px"
          height="18px"
          className="fill-current"
        >
          <path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z" />
        </svg>
      ),
      option: "Reschedule",
    },
  ];

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
            <FlightDetails
              flightDetails={flightDetails}
              travelInfo={travelInfo[0]}
            />
            <InfoAlert city={travelInfo[0].arrivalCity} time={"02:00 PM"} />
            <FlightDetails
              flightDetails={flightDetails}
              travelInfo={travelInfo[1]}
            />
          </div>
        )}
        {/*Flight benefits*/}
        {option == 1 && (
          <div className="p-4 bg-[#F8F9FAFF]">
            <FlightBenefits benefits={benefits} priceDetails={priceDetails} />
          </div>
        )}

        {/* Price and book button*/}
        <div className="flex justify-between items-center p-4 mt-auto">
          <h2 className="flex items-center gap-1 font-semibold text-2xl text-[#FF912BFF]">
            ${flightDetails.flightPrice}
            <span className="text-neutral-400 text-lg font-normal">/ pax</span>
          </h2>
          <div className="flex items-center gap-4">
            <button
              className="flex 
            items-center justify-center
             w-12 h-12 rounded-full
             p-3
              bg-[#EDFEF8FF]
              hover:bg-[#B0F9E2FF]
              hover:active:bg-[#74F4CBFF]
              transition-all duration-150
              "
            >
              <img className="w-5" src={shareIcon} />
            </button>
            <button
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
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightModal;
