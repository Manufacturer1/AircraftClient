import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import creditCardIcon from "../images/creditCard.svg";
import visaCardIcon from "../images/visaCard.svg";
import masterCardIcon from "../images/masterCard.svg";
import amexCardIcon from "../images/amexCard.svg";

const PaymentForm = ({ onPaymentSucceeded, paymentError, paymentIntentId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      onPaymentSucceeded(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);
      setLoading(false);
      onPaymentSucceeded(true, paymentIntent.id);
    } else {
      setError("Unexpected payment status: " + paymentIntent?.status);
      setLoading(false);
      onPaymentSucceeded(false);
    }
  };

  if (paymentSuccess || paymentIntentId) {
    return (
      <div>
        <div className="flex gap-2 items-center mb-7">
          <img className="w-8 h-8" src={creditCardIcon} alt="Card" />
          <h2 className="text-[#6C6CFFFF] font-semibold text-xl">
            Payment process
          </h2>
        </div>

        <div
          className="flex items-center justify-center mx-auto w-[430px] h-[80px] bg-[#EDFEF8FF] 
        rounded-[4px] border-2 border-solid border-[#11D396FF] mb-10"
        >
          <div className="flex items-center justify-center gap-3">
            <img className="w-16 h-16" src={visaCardIcon} alt="Visa" />
            <img className="w-16 h-16" src={masterCardIcon} alt="MasterCard" />
            <img className="w-16 h-16" src={amexCardIcon} alt="Amex" />
          </div>
        </div>
        <div className="p-6 text-center bg-green-50 border border-green-200 rounded-lg text-green-800">
          <h2 className="text-2xl font-semibold mb-2">
            🎉 Payment Successful!
          </h2>
          <p>
            Thank you for your purchase. Your payment has been processed. You
            can now go to the next step.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2 items-center mb-7">
        <img className="w-8 h-8" src={creditCardIcon} alt="Card" />
        <h2 className="text-[#6C6CFFFF] font-semibold text-xl">
          Payment process
        </h2>
      </div>

      <div
        className="flex items-center justify-center mx-auto w-[430px] h-[80px] bg-[#EDFEF8FF] 
        rounded-[4px] border-2 border-solid border-[#11D396FF] mb-10"
      >
        <div className="flex items-center justify-center gap-3">
          <img className="w-16 h-16" src={visaCardIcon} alt="Visa" />
          <img className="w-16 h-16" src={masterCardIcon} alt="MasterCard" />
          <img className="w-16 h-16" src={amexCardIcon} alt="Amex" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-5">
        <PaymentElement />

        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 p-2 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? (
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
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : (
            "Pay Now"
          )}
        </button>
      </form>
      {paymentError && (
        <div className="text-red-600 bg-red-100 border border-red-300 p-2 rounded">
          {paymentError}
        </div>
      )}
    </>
  );
};

export default PaymentForm;
