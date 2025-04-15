import filterIcon from "../../images/filterIcon.svg";
import chevronUpIcon from "../../images/chevronUp.svg";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

const FilterTable = ({ onTransitChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedTransit, setSelectedTransit] = useState("");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTransitChange = (event) => {
    const value = event.target.value;
    const newValue = selectedTransit === value ? "" : value;

    setSelectedTransit(newValue);
    onTransitChange(newValue);
  };

  const handleReset = () => {
    setSelectedTransit("");
    onTransitChange("");
  };

  return (
    <div className="bg-white rounded-md shadow-md p-3 mb-6">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <img src={filterIcon} alt="filter icon" />
          <h4 className="text-xl font-bold text-neutral-700">Filters</h4>
        </div>
        <button
          onClick={handleReset}
          className="text-base font-normal text-neutral-900 h-9 px-2 py-3 
          flex items-center justify-center bg-transparent rounded-xl 
          hover:bg-neutral-200 active:bg-neutral-300 transition-all duration-150"
        >
          Reset
        </button>
      </div>

      <hr className="border-1 border-solid border-[#DEE1E6FF] w-full mb-5" />

      <div className="flex justify-between items-center mb-5">
        <p className="text-base text-neutral-900 font-bold">No. of transit</p>
        <img
          onClick={toggleExpand}
          className={`transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          } cursor-pointer`}
          src={chevronUpIcon}
          alt="chevron up icon"
        />
      </div>
      {isExpanded && (
        <div className="space-y-[-10px] mb-5">
          <div className="flex items-center justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedTransit === "direct"}
                  onChange={handleTransitChange}
                  value={"direct"}
                  color="success"
                />
              }
              label={
                <span className="text-neutral-700 text-sm">Direct Flights</span>
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedTransit === "one-stop"}
                  value={"one-stop"}
                  onChange={handleTransitChange}
                  color="success"
                />
              }
              label={<span className="text-neutral-700 text-sm">One Stop</span>}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterTable;
