import dollarIcon from "../../../../images/dollar.svg";
import flightArrivalIcon from "../../../../images/flightArrival.svg";

const BenefitContainer = ({ benefit }) => {
  return (
    <div className="p-4 rounded-[4px] shadow-md bg-white">
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`${benefit.airlineBgColor} h-10 w-10 rounded flex items-center justify-center`}
        >
          <img src={benefit.airlineIcon} />
        </div>
        <h4 className="text-neutral-700 font-semibold text-base">
          {benefit.airlineName}
        </h4>
      </div>
      <p className="text-base text-neutral-500 font-normal mb-3">
        {benefit.departureCity} - {benefit.arrivalCity}
      </p>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center gap-3">
          <img
            className="w-5 h-5"
            src={flightArrivalIcon}
            alt="flight arrival icon"
          />
          <span className="text-[#FF912BFF] font-normal text-base">
            {benefit.classType}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img
            className="w-5 h-5"
            src={dollarIcon}
            alt="dollar icon for refundable"
          />
          <span className="text-[#0EA776FF] text-base font-medium">
            {benefit.refundable ? "Refundable" : ""}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#0EA776FF] w-5 h-5">
            <svg
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              className="fill-current"
            >
              <path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z" />
            </svg>
          </div>

          <span className="text-[#0EA776FF] text-base font-medium">
            {benefit.reschedule ? "Reschedule Available" : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BenefitContainer;
