import React, { useEffect } from "react";
import AirlineIcon from "../../../generalUseComponents/airlineIconComponent";
import ReactDOM from "react-dom";

const BaggagePolicyModal = ({ benefit, onClose }) => {
  const policy = benefit.baggage;

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
    };
  }, []);

  const modalContent = (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center px-4 transition-opacity duration-300 ease-out">
      <div
        className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl relative z-[10000] border border-gray-200 animate-fadeIn"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <AirlineIcon
            airlineBgColor={benefit.airlineBgColor}
            airlineIcon={benefit.airlineIcon}
            airlineName={benefit.airlineName}
          />
        </div>

        <div className="text-sm text-gray-800 space-y-4"></div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`${benefit.airlineBgColor} text-white font-semibold px-5 py-2 rounded-lg transition duration-200 hover:brightness-110`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default BaggagePolicyModal;
