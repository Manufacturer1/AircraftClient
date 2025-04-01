import { useState } from "react";

const FindInput = ({ icon, defaultText, optionalIcon = null }) => {
  const [value, setValue] = useState(defaultText);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="relative">
      <input
        className="w-[290px] h-10 pl-11 pr-3 
                    text-base text-normal
                    bg-white rounded-[18px]
                    text-neutral-900
                    border-2
                    border-neutral-400
                    border-solid outline-none
                    hover:text-neutral-900 hover:border-neutral-500
                    focus:text-neutral-900 focus:border-neutral-500"
        type="text"
        value={value}
        onChange={handleValueChange}
      />
      <img className="absolute top-[22%] left-[5%]" src={icon} />
      {optionalIcon !== null ? (
        <img className="absolute top-[22%] left-[85%]" src={optionalIcon} />
      ) : (
        ""
      )}
    </div>
  );
};
export default FindInput;
