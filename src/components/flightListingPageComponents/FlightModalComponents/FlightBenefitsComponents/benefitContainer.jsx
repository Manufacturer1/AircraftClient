import dollarIcon from "../../../../images/dollar.svg";
import flightArrivalIcon from "../../../../images/flightArrival.svg";
import { tripTypeToLabel } from "../../../../utils/flightUtils/flightUtils";
import { useCurrency } from "../../../../context/currencyContext";

const BenefitContainer = ({ benefit }) => {
  const { exchangeRate, toCurrency, formatCurrency } = useCurrency();
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
        {benefit.origin} - {benefit.destination}
      </p>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center gap-3">
          <img
            className="w-5 h-5"
            src={flightArrivalIcon}
            alt="flight arrival icon"
          />
          <span className="text-[#FF912BFF] text-base font-medium flex items-center gap-4">
            {benefit.classType}
            <div className="w-1.5 h-1.5 bg-[#FF912BFF] rounded-full"></div>
            <span className="text-[#FF912BFF] font-normal text-base">
              {benefit.flightNumber}
            </span>
          </span>
        </div>
        <div className="flex items-center">
          <img
            className="w-5 h-5"
            src={dollarIcon}
            alt="dollar icon for refundable"
          />
          <span className="text-[#0EA776FF] text-base font-medium">
            {formatCurrency(benefit.finalPrice * exchangeRate, toCurrency)} /
            pax
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-[#0EA776FF] w-6 h-6">
            {benefit.tripType === "OneWay" ? (
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <title />
                <g data-name="Layer 2" id="Layer_2">
                  <path
                    d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z"
                    fill="#11D396FF"
                  />
                </g>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="#686583"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"
                  fill="#11D396FF"
                />
              </svg>
            )}
          </div>

          <span className="text-[#0EA776FF] text-base font-medium">
            {tripTypeToLabel[benefit.tripType]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BenefitContainer;
