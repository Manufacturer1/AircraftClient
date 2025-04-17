import BenefitContainer from "./benefitContainer";
import PriceDetails from "./priceDetailsComponent";
import BaggagePriceContainer from "./baggagePriceContainer";

const FlightBenefits = ({ flightDetails, priceDetails }) => {
  const createFlightDetails = (itinerary, flightInfo) => {
    const { flights, ...rest } = itinerary;
    const { ...flight } = flightInfo;
    return {
      ...rest,
      ...flight,
    };
  };
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-neutral-900 font-semibold text-lg">Conditions</h3>
      {/*Benefit packet */}
      <div
        className={`${
          flightDetails.flights.length > 1 ? "grid grid-cols-2 gap-5" : ""
        } `}
      >
        {flightDetails.flights.map((flight, index) => {
          return (
            <BenefitContainer
              key={index}
              benefit={createFlightDetails(flightDetails, flight)}
            />
          );
        })}
      </div>
      {/*Price details */}
      <h3 className="text-neutral-900 font-semibold text-lg">Price details</h3>
      <div>
        <PriceDetails priceDetails={priceDetails} />
      </div>
      <h3 className="text-neutral-900 font-semibold text-lg">Baggage price</h3>

      <div
        className={`${
          flightDetails.flights.length > 1 ? "grid grid-cols-2 gap-5" : ""
        } `}
      >
        {flightDetails.flights.map((flight, index) => {
          return (
            <BaggagePriceContainer
              key={index}
              benefit={{ ...flightDetails, ...flight }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FlightBenefits;
