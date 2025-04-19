import { useRef, useEffect, useState } from "react";
import CustomStepper from "../components/BookingPageComponents/steeperComponent";
import BookingPriceDetails from "../components/BookingPageComponents/bookingPriceDetailsComponent";
import BookingFlightContainer from "../components/BookingPageComponents/BookingDetailsComponents/bookingFlightContainer";
import PurchaseStep from "./purchaseStep";
import BookingStep from "./bookingStep";
import TicketStep from "./ticketGenerationStep";
import { Link, useLocation } from "react-router-dom";
import NotFound from "../components/generalUseComponents/notFound";
import { getAllDiscounts } from "../services/discountService";
import { calculateDiscountFromPercentage } from "../utils/flightUtils/flightUtils";

const BookingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [nationality, setNationality] = useState("");
  const [country, setCountry] = useState("");
  const [discounts, setDiscounts] = useState([]);
  const stepperRef = useRef(null);
  const location = useLocation();
  const { flightDetails } = location.state || {};
  const [passengerData, setPassengerData] = useState(null);

  //Discount fetching
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const discountsData = await getAllDiscounts();
        setDiscounts(discountsData);
      } catch (err) {
        console.error("Failed to fetch discounts:", err.message);
      }
    };

    fetchDiscounts();
  }, []);
  // Scrolling effect
  useEffect(() => {
    if (stepperRef.current) {
      stepperRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);
  const handleNextStep = () => {
    setActiveStep((prev) => {
      if (prev < 2) {
        return prev + 1;
      } else {
        return prev;
      }
    });

    setTimeout(() => {
      if (stepperRef.current) {
        stepperRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 0);
  };

  const handleBackStep = () => {
    setActiveStep((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });

    setTimeout(() => {
      if (stepperRef.current) {
        stepperRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 0);
  };

  if (!flightDetails) {
    return (
      <NotFound
        errorMessage={"No flight selected. Please go back and choose a flight"}
      />
    );
  }
  const priceDetails = {
    tax: true,
    totalPrice: flightDetails.flightPrice,
    discounts: discounts.map((discount) => ({
      discountName: discount.name,
      discountAmount: calculateDiscountFromPercentage(
        flightDetails.flightPrice,
        discount.percentage
      ),
    })),
    adultFee: flightDetails.flightPrice,
  };

  return (
    <section ref={stepperRef} className="px-20 py-5 mb-10">
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
          <BookingFlightContainer bookingFlightDetails={flightDetails} />
        </div>
      </section>
    </section>
  );
};

export default BookingPage;
