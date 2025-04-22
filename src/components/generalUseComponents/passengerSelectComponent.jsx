import React from "react";
import Select from "react-select";
import { components } from "react-select";

const PassengerSelect = ({
  label,
  placeholder = "Select",
  options = [],
  leftIcon = null,
  value,
  onChange,
  error = "", // ⬅️ include error prop
  ...props
}) => {
  const selectedOption = options.find((opt) => opt.value === value);

  const Control = ({ children, ...rest }) => (
    <components.Control {...rest}>
      {leftIcon && (
        <span className="absolute left-3 text-neutral-500">{leftIcon}</span>
      )}
      {children}
    </components.Control>
  );

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-neutral-800 font-bold">{label}</label>
      <Select
        options={options}
        placeholder={placeholder}
        value={selectedOption}
        onChange={(selected) => {
          if (onChange) {
            onChange({
              target: {
                value: selected?.value || "",
                label: selected?.label || "",
                name: props.name || "",
              },
            });
          }
        }}
        components={{ Control }}
        className={`react-select-container ${error ? "border-red-500" : ""}`}
        classNamePrefix="react-select"
        isClearable={false}
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "18px",
            backgroundColor: "#F3F4F6",
            paddingLeft: leftIcon ? "30px" : "16px",
            minHeight: "40px",
            border: error ? "1px solid #DC2626" : "1px solid transparent",
            boxShadow: "none",
            "&:hover": {
              borderColor: error ? "#DC2626" : "#D1D5DB",
            },
            cursor: "pointer",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#6B7280",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "8px",
            marginTop: "4px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "#E5E7EB" : "white",
            color: "#374151",
            "&:hover": {
              backgroundColor: "#F3F4F6",
              cursor: "pointer",
            },
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: "#6B7280",
            padding: "0 8px",
          }),
        }}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default PassengerSelect;
