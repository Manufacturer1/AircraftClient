import { useRef, useEffect, useState } from "react";
import CustomStepper from "../components/BookingPageComponents/steeperComponent.jsx";
import BookingPriceDetails from "../components/BookingPageComponents/bookingPriceDetailsComponent.jsx";
import BookingFlightContainer from "../components/BookingPageComponents/BookingDetailsComponents/bookingFlightContainer.jsx";
import PurchaseStep from "./purchaseStep";
import BookingStep from "./bookingStep";
import TicketStep from "./ticketGenerationStep";
import { Link, useLocation } from "react-router-dom";
import NotFound from "../components/generalUseComponents/notFound.jsx";
import { getAllDiscounts } from "../services/discountService.js";
import { calculateDiscountFromPercentage } from "../utils/flightUtils/flightUtils.js";
import { validateForm } from "../utils/validationUtils/validationUtils.js";
import TestPayment from "../components/testPaymentComponent.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

const BookingPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [discounts, setDiscounts] = useState([]);
  const stepperRef = useRef(null);
  const location = useLocation();
  const { flightDetails } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [passengerErrors, setPassengerErrors] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cardCvv: "",
  });

  const [passengerData, setPassengerData] = useState({
    name: "",
    surname: "",
    birthday: "",
    passportNumber: "",
    passportExpiryDate: "",
    contactName: "",
    contactSurname: "",
    email: "",
    phoneNumber: "",
    nationality: "",
    country: "",
  });

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
  const handleBookingStepSubmit = () => {
    const data = validateForm(passengerData);

    if (!data.isValid) {
      setPassengerErrors(data.errors);
      return false;
    }

    return true;
  };
  const handlePaymentValidation = () => {
    const data = validateForm(paymentData);

    if (!data.isValid) {
      setPaymentErrors(data.errors);
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (loading || activeStep >= 2) return;

    setLoading(true);

    setTimeout(() => {
      let isStepValid = false;

      if (activeStep === 0) {
        isStepValid = handleBookingStepSubmit();
      } else if (activeStep === 1) {
        isStepValid = handlePaymentValidation();
      }

      if (isStepValid) {
        setActiveStep((prev) => prev + 1);

        setTimeout(() => {
          stepperRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 0);
      }

      setLoading(false);
    }, 1000);
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

  useEffect(() => {
    // Load Stripe once
    setStripePromise(
      loadStripe(
        "pk_test_51R3JTWQUHQvaprleyUhbnrw6NGFu4oCO8kFclTO9f4tL7qA8vlSZhxWDDK8FYCEUgjEkh1KIJCa7pTR52HEzysEO005YoOmEb4"
      )
    );
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const amount = 100;
        const res = await axios.post(
          "https://localhost:7111/api/Payment/create-payment-intent",
          { amount }
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        alert(err.message);
        console.error("Failed to create payment intent:", err);
      }
    };
    createPaymentIntent();
  }, []);
  console.log(clientSecret);
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
              formData={passengerData}
              setFormData={setPassengerData}
              errors={passengerErrors}
              setErrors={setPassengerErrors}
            />
          )}
          {/*Purchase step*/}
          {activeStep === 1 && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <TestPayment />
            </Elements>

            // <PurchaseStep
            //   formData={paymentData}
            //   setFormData={setPaymentData}
            //   errors={paymentErrors}
            //   setErrors={setPaymentErrors}
            // />
          )}
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
                disabled={loading}
                className={`${activeStep === 0 ? "ml-auto" : ""}
                    h-11 text-lg text-white rounded-[4px]
                    px-7 transition-all duration-200
                    ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#11D396FF] hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF]"
                    }
                  `}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Loading...
                  </div>
                ) : (
                  "Next"
                )}
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
