const PriceDetails = ({ priceDetails }) => {
  const calculateDiscountedPrice = (price) => {
    const calculatedPrice = priceDetails.discounts.reduce((acc, discount) => {
      return acc - discount.discountAmount;
    }, price);

    return calculatedPrice;
  };

  return (
    <div className="bg-white rounded-[4px] shadow-md p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center text-neutral-600 font-medium text-base">
        <span>Adult basic fee</span>
        <span>${priceDetails.adultFee}</span>
      </div>
      <div className="flex justify-between items-center text-neutral-600 font-medium text-base">
        <span>Tax</span>
        <span>{priceDetails.tax ? "Included" : ""}</span>
      </div>
      <div className="flex justify-between items-center text-neutral-600 font-medium text-base">
        <span>Regular total price</span>
        <span>${priceDetails.totalPrice}</span>
      </div>
      {priceDetails.discounts.map((discount, index) => (
        <div
          key={index}
          className="flex justify-between items-center text-[#FF912BFF] font-medium text-base"
        >
          <span>{discount.discountName}</span>
          <span className="font-semibold">- ${discount.discountAmount}</span>
        </div>
      ))}
      <hr className="border-1 h-0 border-solid border-neutral-400" />
      <div className="flex justify-between items-center text-neutral-600  font-medium text-base">
        <span>Total</span>
        <span className="font-semibold text-lg text-[#0EA776FF]">
          ${calculateDiscountedPrice(priceDetails.totalPrice)}
        </span>
      </div>
    </div>
  );
};
export default PriceDetails;
