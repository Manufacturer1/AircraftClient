import AirlineIcon from "./airlineIconComponent";
import checkIcon from "../images/check.svg";
import flightArrivalIcon from "../images/flightArrival.svg";

const RefundDetails = ({ refundInfo }) => {
  return (
    <div>
      <div className="flex justify-between">
        <AirlineIcon
          airlineBgColor={refundInfo.airlineBgColor}
          airlineIcon={refundInfo.airlineIcon}
          airlineName={refundInfo.airlineName}
        />
        {refundInfo.refundable && (
          <button className="flex items-center gap-2 justify-center w-32 bg-white rounded-[22px] h-11">
            <img className="w-7" src={checkIcon} alt="check refundable" />
            <span className="text-base font-normal text-[#1DD75BFF]">
              Refundable
            </span>
          </button>
        )}
      </div>
      <p className="text-base font-normal text-neutral-600 mb-3">
        {refundInfo.departureCity} - {refundInfo.arrivalCity}
      </p>
      <div className="flex gap-2 mb-6">
        <img src={flightArrivalIcon} alt="flight arrival sign" />
        <span className="text-[#FF912BFF] font-normal text-base">
          {refundInfo.classType}
        </span>
      </div>
      <hr className="text-neutral-300 mb-5" />

      {/*Refundable reasons*/}
      <h3 className="text-base text-neutral-600 font-normal mb-2">
        Refund is applicable for the following reason(s):
      </h3>
      <ul className="space-y-2 mb-3">
        {refundInfo.refundReasons
          .filter((_, i) => i < 3)
          .map((reason, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              <span className="text-neutral-900 font-normal text-base">
                {reason}
              </span>
            </li>
          ))}
      </ul>
      {/*View more reasons*/}
      <div>
        {refundInfo.refundReasons.length > 3 ? (
          <button className="text-[#0EA776FF] font-normal text-base">
            View {refundInfo.refundReasons.length - 3} more reasons
          </button>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default RefundDetails;
