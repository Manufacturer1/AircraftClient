import filterIcon from "../../images/filterIcon.svg";
import chevronUpIcon from "../../images/chevronUp.svg";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import HourSlider from "./hourSlideComponent";

const FilterTable = () => {
  const [duration, setDuration] = useState(0, 22);

  return (
    <div className="bg-white rounded-md shadow-md p-3 mb-6">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <img src={filterIcon} alt="filter icon" />
          <h4 className="text-xl font-bold text-neutral-700">Filters</h4>
        </div>
        <button
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
          className="cursor-pointer"
          src={chevronUpIcon}
          alt="chevron up icon"
        />
      </div>

      <div className="space-y-[-10px] mb-5">
        <div className="flex items-center justify-between">
          <FormControlLabel
            control={<Checkbox color="success" />}
            label={
              <span className="text-neutral-700 text-sm">Direct Flights</span>
            }
          />
          <span className="text-sm font-normal text-neutral-500">30 USD</span>
        </div>

        <div className="flex items-center justify-between">
          <FormControlLabel
            control={<Checkbox color="success" />}
            label={<span className="text-neutral-700 text-sm">One Stop</span>}
          />
          <span className="text-neutral-500 text-sm font-normal">45 USD</span>
        </div>
      </div>

      <hr className="border-1 border-solid border-[#DEE1E6FF] w-full mb-5" />

      <div className="flex justify-between items-center mb-5">
        <p className="text-base text-neutral-900 font-bold">Transit point</p>
        <img
          className="cursor-pointer"
          src={chevronUpIcon}
          alt="chevron up icon"
        />
      </div>

      <div className="flex flex-col space-y-[-10px] mb-5">
        <FormControlLabel
          control={<Checkbox color="success" />}
          label={<span className="text-neutral-700 text-sm">Osaka (ITM)</span>}
        />

        <FormControlLabel
          control={<Checkbox color="success" />}
          label={
            <span className="text-neutral-700 text-sm">Kuala Lumpur (KUL)</span>
          }
        />
      </div>

      <hr className="border-1 border-solid border-[#DEE1E6FF] w-full mb-5" />

      <div className="flex justify-between items-center mb-5">
        <p className="text-base text-neutral-900 font-bold">Transit duration</p>
        <img
          className="cursor-pointer"
          src={chevronUpIcon}
          alt="chevron up icon"
        />
      </div>

      <HourSlider />
    </div>
  );
};

export default FilterTable;
