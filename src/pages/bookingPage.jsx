import { useState } from "react";
import CustomStepper from "../components/steeperComponent";
import BookingPriceDetails from "../components/bookingPriceDetailsComponent";
import windPowerIcon from "../images/windPowerIcon.svg";
import cactusIcon from "../images/cactus.svg";
import forestIcon from "../images/forest.svg";
import cloudIcon from "../images/soundCloud.svg";
import BookingFlightContainer from "../components/bookingFlightContainer";

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

  return (
    <section className="px-20 py-5">
      <h2 className="text-neutral-900 text-3xl font-bold mb-2">My booking</h2>
      <section className="flex">
        <div className="basis-[75%] max-w-2xl mx-auto mt-14">
          <CustomStepper currentStep={activeStep} />
        </div>
        <div className="basis-[25%] flex flex-col gap-5">
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
