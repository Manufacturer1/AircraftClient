import React from "react";

const CustomStepper = ({ currentStep }) => {
  const steps = ["Booking", "Purchase", "Get your E-ticket"];

  return (
    <div className="flex items-center justify-between w-full max-w-lg mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 flex flex-col items-center relative">
          {/* Line Connector */}
          {index !== 0 && (
            <div
              className={`absolute top-1.5 left-[-50%] w-full h-1 ${
                index <= currentStep ? "bg-green-400" : "bg-gray-300"
              }`}
            />
          )}

          {/* Step Circle */}
          <div
            className={`w-4 h-4 z-10 rounded-full flex items-center justify-center border-2 ${
              index <= currentStep
                ? "bg-green-400 border-green-400"
                : "bg-gray-300 border-gray-300"
            }`}
          ></div>

          {/* Step Label */}
          <span
            className={`mt-2 text-sm font-medium ${
              index <= currentStep ? "text-green-500" : "text-gray-500"
            }`}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomStepper;
