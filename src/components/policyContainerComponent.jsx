const PolicyContainer = ({ options, selected, setSelected }) => {
  return (
    <div>
      <div className="flex flex-col pl-7 pt-2 gap-3">
        {options.map((option, index) => (
          <div
            className={`flex items-center p-2 ${
              index === selected
                ? "border-l-[5px] border-solid border-[#11D396FF]"
                : ""
            }`}
            key={index}
          >
            <span
              onClick={() => setSelected(index)}
              className={`text-base cursor-pointer ${
                selected === index
                  ? "text-[#11D396FF] pl-2 font-bold "
                  : "text-neutral-600 font-normal hover:text-neutral-400 transition-all duration-200"
              }`}
            >
              {option}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyContainer;
