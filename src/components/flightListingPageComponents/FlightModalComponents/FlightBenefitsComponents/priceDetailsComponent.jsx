import { useCurrency } from "../../../../context/currencyContext";

const PriceDetails = ({ priceDetails, flightDetails }) => {
  const { exchangeRate, toCurrency, formatCurrency } = useCurrency();

  const calculateFinalPrice = () => {
    const baseTotal = Number(priceDetails.totalPrice) || 0;

    const totalFees = priceDetails.availabilityFees
      .filter((fee) => fee.active)
      .reduce((acc, fee) => acc + (Number(fee.feeAmount) || 0), 0);

    const totalDiscounts = priceDetails.discounts
      .filter((discount) => discount.isActive)
      .reduce(
        (acc, discount) => acc + (Number(discount.discountAmount) || 0),
        0
      );

    const finalTotal = baseTotal + totalFees - totalDiscounts;
    return finalTotal.toFixed(2);
  };

  return (
    <div className="bg-white rounded-[4px] shadow-md p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center text-neutral-600 font-medium text-base">
        <span>Adult basic fee</span>
        <span>
          {formatCurrency(priceDetails.adultFee * exchangeRate, toCurrency)}
        </span>
      </div>
      <div className="flex justify-between items-center text-neutral-600 font-medium text-base">
        <span>Tax</span>
        <span>{priceDetails.tax ? "Included" : ""}</span>
      </div>
      <div className="flex justify-between items-center text-neutral-600 font-medium text-base">
        <span>Regular total price</span>
        <span>
          {formatCurrency(priceDetails.totalPrice * exchangeRate, toCurrency)}
        </span>
      </div>

      {priceDetails.availabilityFees.map((fee, index) => {
        return fee.active ? (
          <div
            key={index}
            className="flex justify-between items-center text-red-500 font-medium text-base"
          >
            <span>
              Low Availability Fee - {flightDetails.flights[index].flightNumber}
            </span>
            <span className="font-semibold">
              + {formatCurrency(fee.feeAmount * exchangeRate, toCurrency)}
            </span>
          </div>
        ) : (
          ""
        );
      })}

      {priceDetails.discounts.map((discount, index) => {
        return discount.isActive ? (
          <div
            key={index}
            className="flex justify-between items-center text-[#FF912BFF] font-medium text-base"
          >
            <span>{discount.discountName}</span>
            <span className="font-semibold">
              - $
              {formatCurrency(
                discount.discountAmount * exchangeRate,
                toCurrency
              )}
            </span>
          </div>
        ) : (
          ""
        );
      })}
      <hr className="border-1 h-0 border-solid border-neutral-400" />
      <div className="flex justify-between items-center text-neutral-600  font-medium text-base">
        <span>Total</span>
        <span className="font-semibold text-lg text-[#0EA776FF]">
          {formatCurrency(calculateFinalPrice() * exchangeRate, toCurrency)}
        </span>
      </div>
    </div>
  );
};
export default PriceDetails;
