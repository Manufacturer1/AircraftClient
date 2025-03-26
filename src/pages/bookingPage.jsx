import { useState } from "react";
import CustomStepper from "../components/steeperComponent";

const BookingPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="px-20 py-5">
      <h2 className="text-neutral-900 text-2xl font-bold mb-14">My booking</h2>
      <CustomStepper currentStep={0} />
    </section>
  );
};

export default BookingPage;
