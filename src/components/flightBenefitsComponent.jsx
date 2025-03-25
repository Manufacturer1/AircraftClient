import BenefitContainer from "./benefitContainer";
import PriceDetails from "./priceDetailsComponent";
import BaggagePriceContainer from "./baggagePriceContainer";

const FlightBenefits = ({ benefits, priceDetails }) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-neutral-900 font-semibold text-lg">Conditions</h3>
      {/*Benefit packet */}
      <div
        className={`${benefits.length > 1 ? "grid grid-cols-2 gap-5" : ""} `}
      >
        <BenefitContainer benefit={benefits[0]} />
        <BenefitContainer benefit={benefits[1]} />
      </div>
      {/*Price details */}
      <h3 className="text-neutral-900 font-semibold text-lg">Price details</h3>
      <div>
        <PriceDetails priceDetails={priceDetails} />
      </div>
      <h3 className="text-neutral-900 font-semibold text-lg">Baggage price</h3>
      <div
        className={`${benefits.length > 1 ? "grid grid-cols-2 gap-5" : ""} `}
      >
        <BaggagePriceContainer benefit={benefits[0]} />
        <BaggagePriceContainer benefit={benefits[1]} />
      </div>
    </div>
  );
};

export default FlightBenefits;
