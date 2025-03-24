import { useState, useEffect, useRef } from "react";

export default function DropDown({
  title,
  icon,
  bgColor,
  arrowIcon,
  options,
  textColor,
  iconSizes,
}) {
  const [selected, setSelected] = useState(title);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative ${bgColor} px-3  py-2 rounded-full flex items-center gap-2 cursor-pointer`}
      onClick={() => setOpen(!open)}
    >
      {icon && (
        <img
          className={`${iconSizes} block object-cover`}
          src={icon}
          alt="icon"
        />
      )}
      <span className={`${textColor} font-medium`}>{selected}</span>
      {arrowIcon && <img src={arrowIcon} alt="arrow" />}

      {open && options && options.length > 0 && (
        <ul className="absolute top-full mt-2 left-0 w-full bg-white shadow-md rounded-md border z-10">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
