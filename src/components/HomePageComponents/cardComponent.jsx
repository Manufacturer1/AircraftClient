import { useCurrency } from "../../context/currencyContext";

const Card = ({
  cardImg,
  cityName,
  flightDate,
  flightHours,
  timeIcon,
  price,
}) => {
  const { exchangeRate, toCurrency, formatCurrency } = useCurrency();

  const displayPrice = price * exchangeRate;
  return (
    <div className="flex bg-white border-[1px] border-[#FFF7F0FF] border-solid shadow-xs rounded-lg">
      <div className="basis-1/2 ">
        <img
          className="rounded-tl-lg rounded-bl-lg w-[400px] h-[200px]"
          src={cardImg}
          alt="card image"
        />
      </div>
      <div className="basis-1/2 p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-neutral-900 font-bold text-2xl mb-2">
            {cityName}
          </h3>
          <small className="text-sm font-normal text-neutral-700">
            {flightDate}
          </small>
        </div>

        <div className="flex gap-3 items-center ">
          <div className="w-7 h-7 bg-[#F2C263FF] rounded flex items-center justify-center">
            <img
              className="fill-white"
              src={timeIcon}
              alt="icon that represents the flight time"
            />
          </div>
          <small className="text-sm text-neutral-500">{flightHours}</small>
        </div>

        <p className="self-end text-lg text-indigo-500 font-semibold">
          {formatCurrency(displayPrice, toCurrency)}
        </p>
      </div>
    </div>
  );
};

export default Card;
