import sortIcon from "../../images/sortIcon.svg";
import chevronUpIcon from "../../images/chevronUp.svg";
import PriceFilter from "./priceFilterComponent";
import { useState } from "react";

const SortTable = ({ onSortValueChange }) => {
  const [value, setValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-3 mb-6">
      <div className="flex justify-between mb-5">
        <div className="flex items-center">
          <img src={sortIcon} alt="sort icon" />
          <span className="text-xl font-bold text-neutral-700">Sort by</span>
        </div>
        <button
          onClick={() => {
            setValue("");
            onSortValueChange("");
          }}
          className="text-base 
        font-normal
         text-neutral-900 
         h-9 px-2 py-3 
         flex items-center
         justify-center
         bg-transparent rounded-xl
          hover:bg-neutral-200
           hover:active:bg-neutral-300 
           transition-all duration-150"
        >
          Reset
        </button>
      </div>
      <hr className="border-1 border-solid border-[#DEE1E6FF] w-full mb-5" />
      <div
        onClick={toggleExpand}
        className="flex justify-between items-center mb-5"
      >
        <p className="text-base text-neutral-900 font-bold">Price</p>
        <img
          className={`transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          } cursor-pointer`}
          src={chevronUpIcon}
          alt="chevron up icon "
        />
      </div>
      {isExpanded && (
        <PriceFilter
          onValueChange={onSortValueChange}
          value={value}
          setValue={setValue}
        />
      )}
    </div>
  );
};

export default SortTable;
