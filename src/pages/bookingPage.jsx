import { use, useState } from "react";
import CustomStepper from "../components/BookingPageComponents/steeperComponent";
import BookingPriceDetails from "../components/BookingPageComponents/bookingPriceDetailsComponent";
import windPowerIcon from "../images/windPowerIcon.svg";
import cactusIcon from "../images/cactus.svg";
import forestIcon from "../images/forest.svg";
import cloudIcon from "../images/soundCloud.svg";
import BookingFlightContainer from "../components/BookingPageComponents/BookingDetailsComponents/bookingFlightContainer";
import PurchaseStep from "./purchaseStep";
import BookingStep from "./bookingStep";
import TicketStep from "./ticketGenerationStep";
import { Link } from "react-router-dom";

const priceDetails = {
  tax: true,
  totalPrice: 150.0,
  discount: 1.5,
  adultFee: 150.0,
};

const bookingFlightDetails = [
  {
    airlineIcon: cloudIcon,
    airlineBgColor: "bg-[#0D78C9FF]",
    airlineName: "Cloudy Airlines",
    classType: "Economy",
    departureCity: "HOU",
    arrivalCity: "LAS",
    flightDepartureTime: "01:19 PM",
    flightArrivalTime: "02:00 PM",
    flightDepartureDate: "09/02/2023",
    isRefundable: true,
    isRescheduleAvailabe: true,
  },
  {
    airlineIcon: cloudIcon,
    airlineBgColor: "bg-[#0D78C9FF]",
    airlineName: "Cloudy Airlines",
    classType: "Economy",
    departureCity: "LAS",
    arrivalCity: "LAX",
    flightDepartureTime: "02:00 PM",
    flightArrivalTime: "02:45 PM",
    flightDepartureDate: "10/02/2023",
    isRefundable: true,
    isRescheduleAvailabe: true,
  },
];

const BookingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [nationality, setNationality] = useState("");
  const [country, setCountry] = useState("");

  const handleNextStep = () => {
    setActiveStep((prev) => {
      if (prev < 2) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  };

  const handleBackStep = () => {
    setActiveStep((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  return (
    <section className="px-20 py-5 mb-10">
      <h2 className="text-neutral-900 text-3xl font-bold mb-2">My booking</h2>
      <section className="flex gap-24">
        <div className="basis-[70%] mt-14 ">
          {/*Steeper */}
          <div className="mb-10 max-w-2xl mx-auto">
            <CustomStepper currentStep={activeStep} />
          </div>
          {/*Booking Step*/}
          {activeStep === 0 && (
            <BookingStep
              nationality={nationality}
              setNationality={setNationality}
              country={country}
              setCountry={setCountry}
            />
          )}
          {/*Purchase step*/}
          {activeStep === 1 && <PurchaseStep />}
          {/*Ticket generation step*/}
          {activeStep === 2 && <TicketStep />}

          {/*Next and Back buttons*/}
          {activeStep < 2 ? (
            <div className="flex items-center justify-between">
              {activeStep > 0 && (
                <button
                  onClick={handleBackStep}
                  className=" h-11 text-lg text-white rounded-[4px]
             bg-[#11D396FF] px-7
             hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF]
             transition-all duration 200"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNextStep}
                className={`${activeStep === 0 ? "ml-auto" : ""}
             h-11 text-lg text-white rounded-[4px]
             bg-[#11D396FF] px-7
             hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF]
             transition-all duration 200`}
              >
                Next
              </button>
            </div>
          ) : (
            <Link
              to="/"
              className="flex items-center justify-center w-full bg-[#11D396FF] 
            text-white py-2 rounded-[4px] font-medium
            hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF]
            transition-all duration-200"
            >
              Send to my e-mail
            </Link>
          )}
        </div>
        <div className="basis-[30%] flex flex-col gap-5">
          <BookingPriceDetails priceDetails={priceDetails} />
          <BookingFlightContainer
            bookingFlightDetails={bookingFlightDetails}
            departureCity={"Houston"}
            arrivalCity={"Los Angeles"}
          />
        </div>
      </section>
    </section>
  );
};

export default BookingPage;
