import shopingIcon from "../../../images/shopingTag.svg";
import chevronDownLarge from "../../../images/chevronDownLarge.svg";

const PriceHistory = () => {
  return (
    <div className="border-l-8 border-solid border-[#11D396FF] rounded-[4px] h-16 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <img src={shopingIcon} alt="shoping icon" />
        <p className="text-base font-normal text-neutral-700">
          Prices are currently <span className="font-semibold">typical</span>
        </p>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <p className="font-normal text-base text-neutral-400">
            Price history
          </p>
          <img className="cursor-pointer" src={chevronDownLarge} />
        </div>
      </div>
    </div>
  );
};

export default PriceHistory;
