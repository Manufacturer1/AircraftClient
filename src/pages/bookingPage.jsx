import { useRef, useEffect, useState } from "react";
import CustomStepper from "../components/BookingPageComponents/steeperComponent.jsx";
import BookingPriceDetails from "../components/BookingPageComponents/bookingPriceDetailsComponent.jsx";
import BookingFlightContainer from "../components/BookingPageComponents/BookingDetailsComponents/bookingFlightContainer.jsx";
import BookingStep from "./bookingStep";
import TicketStep from "./ticketGenerationStep";
import { useLocation } from "react-router-dom";
import NotFound from "../components/generalUseComponents/notFound.jsx";
import { getAllDiscounts } from "../services/discountService.js";
import { calculateDiscountFromPercentage } from "../utils/flightUtils/flightUtils.js";
import { validateForm } from "../utils/validationUtils/validationUtils.js";
import PaymentForm from "../components/paymentForm.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  createPaymentIntent,
  clearStoredPaymentIntent,
} from "../services/paymentService.js";
import {
  saveBookingState,
  getCurrentSavedState,
  bookFlight,
  clearSession,
} from "../services/bookingService.js";

const BookingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [discounts, setDiscounts] = useState([]);
  const stepperRef = useRef(null);
  const location = useLocation();
  const { flightDetails } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [passengerErrors, setPassengerErrors] = useState({});
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [bookingError, setBookingError] = useState("");

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

  const handlePaymentStep = () => {
    if (!paymentDone) {
      setPaymentErrorMessage(
        "You should first pay before getting to the next step."
      );
      return false;
    }
    return true;
  };
  const createIntent = async () => {
    try {
      const response = await createPaymentIntent(
        flightDetails.calculatedPrice,
        "usd"
      );
      setClientSecret(response);
    } catch (error) {
      console.error(error.message);
      setPaymentErrorMessage(
        error.message || "Failed to create payment intent"
      );
    }
  };

  useEffect(() => {
    const getCurrentState = async () => {
      try {
        const response = await getCurrentSavedState();
        const formatDateForInput = (dateString) => {
          if (!dateString) return "";
          const date = new Date(dateString);
          return date.toISOString().split("T")[0];
        };
        const data = {
          name: response.passenger.name,
          surname: response.passenger.surname,
          birthday: formatDateForInput(response.passenger?.birthDay),
          nationality: response.passenger.nationality,
          passportNumber: response.passport.passportNumber,
          country: response.passport.country,
          passportExpiryDate: formatDateForInput(response.passport?.expiryDate),
          contactName: response.contactDetails.name,
          contactSurname: response.contactDetails.surname,
          email: response.contactDetails.email,
          phoneNumber: response.contactDetails.phoneNumber,
        };
        if (response.paymentIntentId) {
          setPaymentIntentId(response.paymentIntentId);
        }

        setPassengerData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentState();
  }, [activeStep]);

  const saveState = async (paymentIntentId) => {
    try {
      const _ = await saveBookingState(passengerData, paymentIntentId);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError("");

    if (!paymentIntentId) {
      setBookingError("You need to pay first in order to book the flight.");
      return false;
    }

    try {
      const payload = {
        passengerNumberSelected: parseInt(flightDetails.passengerNumber),
        itineraryId: parseInt(flightDetails.itineraryId),
      };
      const _ = await bookFlight(payload);
      return true;
    } catch (error) {
      console.error(error.message);
      setBookingError(error.message || "Booking failed. Please try again.");
      return false;
    }
  };

  const handleNextStep = async (e) => {
    if (loading || activeStep >= 2) return;
    setBookingError("");
    setPaymentErrorMessage("");
    setLoading(true);

    setTimeout(async () => {
      let isStepValid = false;

      if (activeStep === 0) {
        isStepValid = handleBookingStepSubmit();
      } else if (activeStep === 1) {
        await saveState(paymentIntentId);
        isStepValid = handlePaymentStep();
        isStepValid = await handleBookingSubmit(e);
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
      loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY, {
        locale: "en",
      })
    );
  }, []);
  useEffect(() => {
    if (activeStep === 1 && !clientSecret) {
      createIntent();
    }
  }, [activeStep, clientSecret]);

  const handlePaymentSuccess = async (success, paymentId) => {
    setPaymentDone(success);
    setPaymentIntentId(paymentId);
    await saveState(paymentId);
    clearStoredPaymentIntent();
  };

  useEffect(() => {
    if (activeStep === 2) {
      const clearSessionData = async () => {
        try {
          await clearSession();
          console.log("Session cleared successfully");
        } catch (error) {
          console.error("Failed to clear session:", error);
        }
      };
      clearSessionData();
    }
  }, [activeStep]);

  return (
    <section ref={stepperRef} className="px-20 py-5 mb-10">
      <h2 className="text-neutral-900 text-3xl font-bold mb-2">My booking</h2>
      <section className="flex gap-24">
        <div className="basis-[70%] mt-14 ">
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
              <PaymentForm
                onPaymentSucceeded={handlePaymentSuccess}
                paymentError={paymentErrorMessage}
                paymentIntentId={paymentIntentId}
              />
            </Elements>
          )}
          {/*Ticket generation step*/}
          {activeStep === 2 && paymentIntentId ? (
            <TicketStep />
          ) : (
            activeStep === 2 &&
            !paymentIntentId && (
              <NotFound
                errorMessage={
                  "You need to get through booking wizard in order to see your ticket."
                }
              />
            )
          )}

          {bookingError && (
            <div className="my-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p>{bookingError}</p>
            </div>
          )}
          {/*Next and Back buttons*/}
          {activeStep < 2 ? (
            <div className="flex items-center justify-between mt-10">
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
                ) : activeStep === 1 ? (
                  "Book Flight"
                ) : (
                  "Next"
                )}
              </button>
            </div>
          ) : (
            paymentIntentId && (
              <button
                className="flex items-center justify-center w-full bg-[#11D396FF] 
                text-white py-2 rounded-[4px] font-medium
                hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF]
                transition-all duration-200"
              >
                Send to my e-mail
              </button>
            )
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
