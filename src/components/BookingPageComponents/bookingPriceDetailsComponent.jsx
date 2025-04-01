import dollarIcon from "../../images/dollar.svg";

const BookingPriceDetails = ({ priceDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-3">
        <img className="w-6" src={dollarIcon} alt="price details dollar" />
        <h2 className="text-neutral-700 font-bold text-lg">Price details</h2>
      </div>
      <hr className="border-solid  border-[ #BCC1CAFF] mb-3" />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center ">
          <span className="font-medium text-base text-neutral-600">
            Adult basic fee
          </span>
          <span className="font-medium text-base text-neutral-600">
            ${priceDetails.adultFee}
          </span>
        </div>
        <div className="flex justify-between items-center ">
          <span className="font-medium text-base text-neutral-600">Tax</span>
          <span className="font-medium text-base text-neutral-600">
            {priceDetails.tax ? "Included" : ""}
          </span>
        </div>
        <div className="flex justify-between items-center ">
          <span className="font-medium text-base text-neutral-600">
            Regular total price
          </span>
          <span className="font-medium text-base text-neutral-600">
            ${priceDetails.totalPrice}
          </span>
        </div>
        <div className="flex justify-between items-center ">
          <span className="font-medium text-base text-[#FF912BFF]">Save</span>
          <span className="font-semibold text-base text-[#FF912BFF]">
            - ${priceDetails.discount}
          </span>
        </div>
        <hr className="border-solid  border-[ #BCC1CAFF]" />
        <div className="flex justify-between items-center ">
          <span className="font-medium text-base text-neutral-600">Total</span>
          <span className="font-semibold text-base text-[#0EA776FF]">
            ${priceDetails.totalPrice - priceDetails.discount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingPriceDetails;
