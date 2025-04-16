import { format } from "date-fns";

export const convertToDisplayFormat = (date) => {
  if (!date) return null;

  if (date.includes("/")) {
    return date;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  return date;
};
export const compareDates = (flightDate, scheduleDate) => {
  const cleanedFlightDate = flightDate.substring(0, 10);
  const [flightYear, flightMonth, flightDay] = cleanedFlightDate.split("-");
  const [scheduleday, scheduleMonth] = format(scheduleDate, "dd-MM").split("-");

  if (
    parseInt(flightMonth) === parseInt(scheduleMonth) &&
    parseInt(flightDay) === parseInt(scheduleday)
  ) {
    return true;
  }
  return false;
};

export const createDateSchedule = () => {
  const datesMap = [];

  for (let i = 0; i < 5; i++) {
    const data = {
      date: format(new Date().setDate(new Date().getDate() + i), "EEE, d MMM"),
      price: "",
    };
    datesMap.push(data);
  }

  return datesMap;
};
export const tripTypeToLabel = {
  OneWay: "One way",
  RoundTrip: "Round trip",
};

export const labelToTripType = {
  "One way": "OneWay",
  "Round trip": "RoundTrip",
};
export const travelClassToLabel = {
  Economy: "Economy",
  FirstClass: "First Class",
};

export const labelToTravelClass = {
  Economy: "Economy",
  "First Class": "FirstClass",
};

export const getAirlineIcon = (airlineIconName) => {
  if (airlineIconName)
    return `${import.meta.env.VITE_RESOURCE_PATH_URL}/${airlineIconName}`;
  return cloudIcon;
};
export const getAirlineBgColor = (bgColor) => {
  switch (bgColor) {
    case "#6ECFBDFF":
      return "bg-[#6ECFBDFF]";
    case "#FF912BFF":
      return "bg-[#FF912BFF]";
    case "#0D78C9FF":
      return "bg-[#0D78C9FF]";
    case "#E5343AFF":
      return "bg-[#E5343AFF]";
    default:
      return "bg-[#0D78C9FF]";
  }
};
export const formatDateToString = (date) => {
  if (!date) return null;
  if (typeof date === "string") return date;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const convertToApiFormat = (date) => {
  if (!date) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }
  if (date.toString().includes("/")) {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }

  return date;
};
export const getUniqueValues = (items, keySelector) => [
  ...new Set(items.map(keySelector).filter(Boolean)),
];
export const fetchAndMapById = async (ids, fetchFunc) => {
  const responses = await Promise.all(ids.map(fetchFunc));
  return responses.reduce((acc, item) => {
    if (item) acc[item.id] = item;
    return acc;
  }, {});
};

export const formatAmenityIcon = (icon) =>{
  return `${import.meta.env.VITE_RESOURCE_PATH_URL}/${icon}`;
};