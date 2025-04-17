import AirlineIcon from "../../../generalUseComponents/airlineIconComponent";
import arrowOutwardIcon from "../../../../images/arrowOutword.svg";
import BaggagePolicyModal from "./baggagePolicyModal";
import { useState } from "react";

const BaggagePriceContainer = ({ benefit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="bg-white rounded-[4px] shadow-md p-4">
        <div className="flex items-start justify-between">
          <AirlineIcon
            airlineBgColor={benefit.airlineBgColor}
            airlineIcon={benefit.airlineIcon}
            airlineName={benefit.airlineName}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center"
          >
            <img src={arrowOutwardIcon} alt="arrow outward" />
          </button>
        </div>

        <span className="text-sm text-neutral-500">
          {benefit.origin} - {benefit.destination}
        </span>
      </div>
      {isModalOpen && (
        <BaggagePolicyModal
          benefit={benefit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BaggagePriceContainer;
