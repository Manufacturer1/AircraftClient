const DateContainer = ({ flightDate }) => {
  const parseDay = (date) => {
    const day = new Date(date).getDate();
    return day;
  };

  const parseMonth = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthIndex = new Date(date).getMonth();
    return months[monthIndex];
  };

  const parseYear = (date) => {
    const year = new Date(date).getFullYear();
    return year;
  };

  const formattedDate = flightDate.split("/").reverse().join("-");

  return (
    <div className="rounded-[4px] bg-[#F8F9FAFF] shadow-sm flex items-center justify-center py-4 px-6">
      <div className="flex flex-col items-center justify-center">
        <span className="text-[#6C6CFFFF] text-xl ">
          {parseDay(formattedDate)}
        </span>
        <div>
          <span className="text-neutral-500 text-base">
            {parseMonth(formattedDate).slice(0, 3)}, {parseYear(formattedDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DateContainer;
