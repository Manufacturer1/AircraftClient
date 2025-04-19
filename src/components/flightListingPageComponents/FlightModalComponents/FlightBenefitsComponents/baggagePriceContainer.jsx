import AirlineIcon from "../../../generalUseComponents/airlineIconComponent";
import arrowOutwardIcon from "../../../../images/arrowOutword.svg";
import BaggagePolicyModal from "./baggagePolicyModal";
import { useState } from "react";

const BaggagePriceContainer = ({ benefit }) => {
  return (
    <div>
      <div className="bg-white rounded-[4px] shadow-md p-4">
        <div className="flex items-start justify-between">
          <AirlineIcon
            airlineBgColor={benefit.airlineBgColor}
            airlineIcon={benefit.airlineIcon}
            airlineName={benefit.airlineName}
          />
          <button className="flex items-center justify-center"></button>
        </div>

        <div className="space-y-1">
          <span className="text-sm text-neutral-500">
            {benefit.origin} - {benefit.destination}
          </span>
          <span className="text-[#0EA776FF] font-normal text-sm flex items-center gap-4">
            Cabin Baggage
            <div className="w-1.5 h-1.5 bg-[#11D396FF] rounded-full"></div>
            <span className="text-neutral-600 text-sm">
              {benefit.baggage.freeCabinBags} x{" "}
              {benefit.baggage.cabinWeightLimitKg} kg
            </span>
          </span>
          <span className="text-[#0EA776FF] font-normal text-sm flex items-center gap-4">
            Checked Baggage
            <div className="w-1.5 h-1.5 bg-[#11D396FF] rounded-full"></div>
            <span className="text-neutral-600 text-sm">
              {benefit.baggage.freeCheckedBags} x{" "}
              {benefit.baggage.checkedWeightLimitKg} kg
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BaggagePriceContainer;
