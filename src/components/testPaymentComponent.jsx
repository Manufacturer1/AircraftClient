import { useEffect, useState } from "react";
import axios from "axios";

import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

const TestPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      return_url: `${window.location.origin}/`,
    });
    if (error) {
      alert("Payment error " + error.message);
    }
  };

  if (loading) return <div>Loading payment system...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit">Pay Now</button>
      </form>
    </>
  );
};

export default TestPayment;
