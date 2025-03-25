import AirlineIcon from "./airlineIconComponent";
import arrowOutwardIcon from "../images/arrowOutword.svg";

const BaggagePriceContainer = ({ benefit }) => {
  return (
    <div className="bg-white rounded-[4px] shadow-md p-4">
      <div className="flex items-start justify-between">
        <AirlineIcon
          airlineBgColor={benefit.airlineBgColor}
          airlineIcon={benefit.airlineIcon}
          airlineName={benefit.airlineName}
        />
        <img src={arrowOutwardIcon} alt="arrow outward" />
      </div>

      <span className="text-sm text-neutral-500">
        {benefit.departureCity} - {benefit.arrivalCity}
      </span>
    </div>
  );
};

export default BaggagePriceContainer;
