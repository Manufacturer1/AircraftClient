import BenefitContainer from "./benefitContainer";
import PriceDetails from "./priceDetailsComponent";
import BaggagePriceContainer from "./baggagePriceContainer";
import { getAllDiscounts } from "../../../../services/discountService";
import { useEffect, useState } from "react";
import {
  calculateDiscountFromPercentage,
  calculateLowAvailabilityFee,
} from "../../../../utils/flightUtils/flightUtils";

const FlightBenefits = ({ flightDetails }) => {
  const [discounts, setDiscounts] = useState([]);
  const createFlightDetails = (itinerary, flightInfo) => {
    const { flights, ...rest } = itinerary;
    const { ...flight } = flightInfo;
    return {
      ...rest,
      ...flight,
    };
  };
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const discountsData = await getAllDiscounts();
        setDiscounts(discountsData);
      } catch (err) {
        console.error("Failed to fetch discounts:", err.message);
      }
    };

    fetchDiscounts();
  }, []);

  const availabilityFees = flightDetails.flights.map((flight) => ({
    active: flight.availableSeats < flight.totalSeats * 0.2,
    feeAmount: calculateLowAvailabilityFee(
      flight.basePrice,
      flight.availableSeats,
      flight.totalSeats
    ),
  }));

  const totalActiveFeeAmount = availabilityFees
    .filter((fee) => fee.active)
    .reduce((acc, fee) => acc + (Number(fee.feeAmount) || 0), 0);

  const totalPriceWithFees = flightDetails.flightPrice + totalActiveFeeAmount;

  // Apply discount to totalPriceWithFees instead of just fees
  const discountObjects = discounts.map((discount) => ({
    isActive: discount.isActive,
    discountName: discount.name,
    discountAmount: calculateDiscountFromPercentage(
      totalPriceWithFees,
      discount.percentage
    ),
  }));

  const priceDetails = {
    tax: true,
    totalPrice: flightDetails.flightPrice,
    availabilityFees,
    discounts: discountObjects,
    adultFee: flightDetails.flightPrice,
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
        <PriceDetails
          priceDetails={priceDetails}
          flightDetails={flightDetails}
        />
      </div>
      <h3 className="text-neutral-900 font-semibold text-lg">
        Baggage Details
      </h3>

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
