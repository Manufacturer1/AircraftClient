import { useRef, useEffect, useState, use } from "react";
import CustomStepper from "../components/BookingPageComponents/steeperComponent.jsx";
import BookingPriceDetails from "../components/BookingPageComponents/bookingPriceDetailsComponent.jsx";
import BookingFlightContainer from "../components/BookingPageComponents/BookingDetailsComponents/bookingFlightContainer.jsx";
import BookingStep from "./bookingStep";
import TicketStep from "./ticketGenerationStep";
import { useLocation } from "react-router-dom";
import NotFound from "../components/generalUseComponents/notFound.jsx";
import { getAllDiscounts } from "../services/discountService.js";
import ButtonLoadinSpinner from "../components/generalUseComponents/buttonLoadingSpinner.jsx";
import { toast } from "react-toastify";

import {
  calculateDiscountFromPercentage,
  calculateLowAvailabilityFee,
} from "../utils/flightUtils/flightUtils.js";
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
  getTicketByPaymentIntentId,
} from "../services/bookingService.js";
import { sendNotification } from "../services/notificationService.js";
import { usePassenger } from "../context/passengerContext.jsx";

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
  const [tickets, setTickets] = useState([]);
  const [ticketError, setTicketError] = useState("");
  const [loadingInitialState, setLoadingInitialState] = useState(true);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const { setPassengerEmail } = usePassenger();

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
        const formatDate = (date) => {
          const [d, _] = date.split("T");
          return d;
        };

        const data = {
          name: response.passenger.name,
          surname: response.passenger.surname,
          birthday: formatDate(response.passenger?.birthDay),
          nationality: response.passenger.nationality,
          passportNumber: response.passport.passportNumber,
          country: response.passport.country,
          passportExpiryDate: formatDate(response.passport?.expiryDate),
          contactName: response.contactDetails.name,
          contactSurname: response.contactDetails.surname,
          email: response.contactDetails.email,
          phoneNumber: response.contactDetails.phoneNumber,
        };

        setActiveStep(response.activeStep || 0);

        setPassengerEmail(data.email);

        if (response.paymentIntentId) {
          setPaymentIntentId(response.paymentIntentId);
        }

        setPassengerData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingInitialState(false);
      }
    };
    getCurrentState();
  }, [activeStep]);

  const saveState = async (paymentIntentId, activeStep) => {
    try {
      await saveBookingState(passengerData, paymentIntentId, activeStep);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoadingInitialState(false);
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
      const response = await bookFlight(payload);
      if (response.success) {
        setTickets(response.tickets);
      }
      return true;
    } catch (error) {
      console.error(error.message);
      setBookingError(error.message || "Booking failed. Please try again.");
      return false;
    }
  };

  const handleNextStep = async (e) => {
    if (loading || activeStep >= 2) return;

    console.log("Current activeStep:", activeStep);
    setBookingError("");
    setPaymentErrorMessage("");
    setLoading(true);

    try {
      let isStepValid = false;

      // Small delay to ensure loading state is visible
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (activeStep === 0) {
        isStepValid = handleBookingStepSubmit();
        if (isStepValid) {
          console.log("Step 0 validated, saving state...");
          await saveState(paymentIntentId, 1);

          // Delay before UI update to ensure state is saved
          await new Promise((resolve) => setTimeout(resolve, 200));

          setActiveStep(1);
          console.log("Advanced to step 1");
        }
      }

      // STEP 1: Payment and Booking Submission
      else if (activeStep === 1) {
        console.log("Validating payment...");
        isStepValid = handlePaymentStep();

        if (isStepValid) {
          console.log("Payment valid, submitting booking...");
          isStepValid = await handleBookingSubmit(e);

          if (isStepValid) {
            console.log("Booking submitted, saving state...");
            await saveState(paymentIntentId, 2);

            // Delay before final transition
            await new Promise((resolve) => setTimeout(resolve, 300));

            setActiveStep(2);
            console.log("Advanced to step 2");
          }
        }
      }

      if (isStepValid) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        stepperRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } catch (error) {
      console.error("Error in handleNextStep:", error);
      // Delay before showing error to prevent flickering
      await new Promise((resolve) => setTimeout(resolve, 200));
      setBookingError(error.message || "An error occurred");
    } finally {
      // Small delay before releasing loading state
      await new Promise((resolve) => setTimeout(resolve, 100));
      setLoading(false);
    }
  };
  const handleBackStep = async () => {
    await saveState(paymentIntentId, activeStep - 1);
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
  const availabilityFees = flightDetails.flights.map((flight) => ({
    active: flight.availableSeats <= flight.totalSeats * 0.2,
    feeAmount: calculateLowAvailabilityFee(
      flight.basePrice,
      flight.availableSeats,
      flight.totalSeats
    ),
  }));

  const totalActiveFeeAmount = availabilityFees
    .filter((fee) => fee.active)
    .reduce((acc, fee) => acc + (Number(fee.feeAmount) || 0), 0);

  const totalPriceWithFees = flightDetails.flightPrice + totalActiveFeeAmount;

  const discountObjects = discounts.map((discount) => ({
    isActive: discount.isActive,
    discountName: discount.name,
    discountAmount: calculateDiscountFromPercentage(
      totalPriceWithFees,
      discount.percentage
    ),
  }));

  const priceDetails = {
    tax: true,
    totalPrice: flightDetails.flightPrice,
    availabilityFees,
    discounts: discountObjects,
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
    await saveState(paymentId, activeStep);
    clearStoredPaymentIntent();
  };
  const clearSessionData = async () => {
    try {
      await clearSession();
      console.log("Session cleared successfully");
    } catch (error) {
      console.error("Failed to clear session:", error);
    }
  };

  useEffect(() => {
    if (activeStep !== 2) return;

    const fetchTickets = async () => {
      if (!paymentIntentId) {
        console.warn("No paymentIntentId available");
        return;
      }

      try {
        const data = await getTicketByPaymentIntentId(paymentIntentId);
        if (data) {
          setTickets(data);
        } else {
          setTicketError("No ticket data received");
        }
      } catch (err) {
        setTicketError(err.message || "Ticket fetch failed");
      }
    };

    const timer = setTimeout(fetchTickets, 300);

    return () => clearTimeout(timer);
  }, [activeStep, paymentIntentId]);

  const sendNotificationEmail = async () => {
    if (!tickets || ticketError) {
      return;
    }
    setLoadingEmail(true);

    try {
      const response = await sendNotification(tickets[0].bookingId);
      await clearSessionData();
      console.log(
        `Reponse state: ${response.flag}, Response message: ${response.message}`
      );
      if (response.flag) {
        toast.success("Email sent successfully!");
      } else {
        toast.error("Failed to send notifications: " + response.message);
      }
    } catch (error) {
      console.error(error.message || "Failed to send notification");
    } finally {
      setLoadingEmail(false);
    }
  };

  if (!(paymentIntentId || !paymentDone) && activeStep === 2) {
    return <NotFound errorMessage={"You have to pass the booking wizard."} />;
  }

  if (loadingInitialState) {
    return (
      <section className="px-20 py-5 mb-10">
        <h2 className="text-neutral-900 text-3xl font-bold mb-2">My booking</h2>
        <div className="text-center mt-20 text-gray-500">
          Loading booking data...
        </div>
      </section>
    );
  }
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
          {activeStep === 2 && (
            <>
              {ticketError && (
                <div className="my-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                  <p>{ticketError}</p>
                </div>
              )}
              {tickets ? (
                <TicketStep tickets={tickets} />
              ) : (
                <NotFound
                  errorMessage={
                    "You need to get through booking wizard in order to see your ticket."
                  }
                />
              )}
            </>
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
                    <ButtonLoadinSpinner />
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
            <button
              onClick={sendNotificationEmail}
              disabled={loadingEmail}
              className={`flex items-center justify-center w-full h-10
              ${
                loadingEmail
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#11D396FF] text-white py-2 rounded-[4px] font-medium hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF] transition-all duration-200"
              }
            `}
            >
              {loadingEmail ? (
                <div className="flex items-center gap-2">
                  <ButtonLoadinSpinner />
                  Sending Email...
                </div>
              ) : (
                "Send to my e-mail"
              )}
            </button>
          )}
        </div>
        <div className="basis-[30%] flex flex-col gap-5">
          <BookingPriceDetails
            priceDetails={priceDetails}
            flightDetails={flightDetails}
          />
          <BookingFlightContainer bookingFlightDetails={flightDetails} />
        </div>
      </section>
    </section>
  );
};

export default BookingPage;
