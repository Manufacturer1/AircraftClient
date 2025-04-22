const PassengerInput = ({
  inputType,
  placeholder,
  label,
  leftIcon = null,
  rightIcon = null,
  value,
  name,
  onChange,
  error,
  onBlur,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-neutral-800 font-bold">{label}</label>
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span className="absolute left-3 text-neutral-500">{leftIcon}</span>
        )}
        <input
          onWheel={(e) => e.target.blur()}
          className={`h-10 w-full px-4 text-base font-normal bg-[#F3F4F6] 
            rounded-[18px] outline-none text-neutral-700 
            focus:bg-white focus:ring-[2px] focus:border-0
            focus:ring-gray-200 shadow-inner transition-all duration-200
            ${leftIcon ? "pl-10" : ""} ${rightIcon ? "pr-10" : ""}
            ${
              error
                ? "border border-red-500"
                : "border border-transparent hover:border-neutral-300"
            }`}
          type={inputType}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />

        {rightIcon && (
          <span className="absolute right-3 text-neutral-500 w-6 h-6">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PassengerInput;
