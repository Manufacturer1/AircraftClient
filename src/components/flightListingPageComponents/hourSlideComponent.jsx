import { Slider } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "0 0 0 8px rgba(82, 175, 119, 0.16)",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const HourSlider = () => {
  const [value, setValue] = useState([2, 19]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <PrettoSlider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={22}
        disableSwap
        aria-labelledby="hour-slider"
      />
      <div className="flex justify-between mt-2">
        <span className="text-sm font-normal">0h</span>
        <span className="text-sm font-normal text-[#52af77]">
          {value[1] - value[0]}h
        </span>
        <span className="text-sm font-normal">22h</span>
      </div>
    </div>
  );
};

export default HourSlider;
