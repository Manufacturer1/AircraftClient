import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const BaggagePolicyModal = ({ benefit, onClose }) => {
  const policy = benefit.baggage;

  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    const originalOverscroll = window.getComputedStyle(
      document.body
    ).overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
    };
  }, []);

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-[9999] flex items-center justify-center">
      <div
        className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl relative z-[10000]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">
          Baggage Policy – {benefit.airlineName}
        </h2>

        <p className="text-sm text-neutral-700 mb-2">
          Free Cabin Bags: {policy.freeCabinBags} (max{" "}
          {policy.cabinWeightLimitKg}kg)
        </p>
        <p className="text-sm text-neutral-700 mb-2">
          Free Checked Bags: {policy.freeCheckedBags} (max{" "}
          {policy.checkedWeightLimitKg}kg)
        </p>

        <div className="mt-4">
          {/* Input fields */}
          <label className="block text-sm font-medium">Cabin Bags:</label>
          <input type="number" className="border p-1 rounded w-full mb-2" />
          <label className="block text-sm font-medium">
            Cabin Total Weight (kg):
          </label>
          <input type="number" className="border p-1 rounded w-full mb-2" />
          <label className="block text-sm font-medium">Checked Bags:</label>
          <input type="number" className="border p-1 rounded w-full mb-2" />
          <label className="block text-sm font-medium">
            Checked Total Weight (kg):
          </label>
          <input type="number" className="border p-1 rounded w-full" />
        </div>

        <div className="mt-4 font-semibold text-blue-600"></div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className={`${benefit.airlineBgColor} text-white px-4 py-2 rounded`}
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
