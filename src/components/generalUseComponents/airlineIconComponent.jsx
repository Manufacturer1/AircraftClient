const AirlineIcon = ({ airlineBgColor, airlineIcon, airlineName }) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div
        className={`${airlineBgColor} h-10 w-10 rounded flex items-center justify-center`}
      >
        <img src={airlineIcon} />
      </div>
      <h4 className="text-neutral-700 font-semibold text-base">
        {airlineName}
      </h4>
    </div>
  );
};

export default AirlineIcon;
