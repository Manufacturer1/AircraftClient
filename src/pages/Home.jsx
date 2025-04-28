import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format, parseISO, isBefore, isSameDay, isSameMonth } from "date-fns";
// Components
import Tag from "../components/HomePageComponents/tagComponent";
import DropDown from "../components/generalUseComponents/dropDownMenu";
import SearchBar from "../components/HomePageComponents/searchBarComponent";
import Card from "../components/HomePageComponents/cardComponent";
import Calendar from "../components/generalUseComponents/Calendar";
// Icons
import compareArrows from "../images/material-compareArrows-Outlined.svg";
import rightArrow from "../images/rightArrow.svg";
import accountIcon from "../images/accountIcon.svg";
import arrowIcon from "../images/arrowIcon.svg";
import arrowDownOutliened from "../images/arrowDownOutliened.svg";
import ticketOutlined from "../images/ticketOutlined.svg";
import calendarIcon from "../images/calendarIcon.svg";
import orangeCalendarIcon from "../images/orangeCalendarIcon.svg";
import earthImage from "../images/earth_image.png";
import pinIcon from "../images/pin.svg";
import sunriseIcon from "../images/sunriseIcon.svg";

import { searchFlights } from "../services/flightService";

const Home = () => {
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const resultsRef = useRef(null);
  const searchSectionRef = useRef(null);

  const scrollTimeoutRef = useRef(null);
  const modifySearchTimeoutRef = useRef(null);
  const apiTimeoutRef = useRef(null);

  const [flightResults, setFlightResults] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearTimeout(scrollTimeoutRef.current);
      clearTimeout(modifySearchTimeoutRef.current);
      clearTimeout(apiTimeoutRef.current);
    };
  }, []);

  const handleExploreDestination = () => {
    if (flightResults.length === 0) return;

    const params = new URLSearchParams();
    params.append("origin", searchData.origin);
    params.append("destination", searchData.destination);
    params.append(
      "departureDate",
      format(searchData.departureDate, "dd/MM/yyyy")
    );
    params.append("returnDate", format(searchData.returnDate, "dd/MM/yyyy"));
    params.append("passengerCount", searchData.passengerCount);
    params.append("travelClass", searchData.travelClass);
    params.append("tripType", searchData.tripType);

    navigate(`/flights?${params.toString()}`, {
      state: { results },
    });
  };

  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    tripType: "RoundTrip",
    passengerCount: 1,
    travelClass: "Economy",
    departureDate: null,
    returnDate: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTripTypeChange = (type) => {
    console.log(type);
    setSearchData((prev) => ({
      ...prev,
      tripType: type,
      returnDate:
        type === "OneWay" ? searchData.departureDate : searchData.returnDate,
    }));
  };

  const handleDepartureDateSelect = (date) => {
    setSearchData((prev) => ({
      ...prev,
      departureDate: date,
      returnDate:
        searchData.tripType === "OneWay" ? date : searchData.returnDate,
    }));

    setShowDepartureCalendar(false);
  };

  const handleReturnDateSelect = (date) => {
    setSearchData((prev) => ({
      ...prev,
      returnDate: date ? date : searchData.departureDate,
    }));
    setShowReturnCalendar(false);
  };
  const handleTravelClassChange = (value) => {
    const serverFormat = labelToTravelClass[value];
    setSearchData((prev) => ({
      ...prev,
      travelClass: serverFormat,
    }));
    console.log(serverFormat);
  };

  const getReturnDateDisplay = () => {
    if (searchData.returnDate)
      return format(searchData.returnDate, "dd MMM, yyyy");

    return "Return date";
  };

  useEffect(() => {
    if (searchData.departureDate === "" || searchData.departureDate === null) {
      setSearchData((prev) => ({
        ...prev,
        departureDate: format(new Date(), "d, MMM yyyy"),
        returnDate: format(new Date(), "d MMM yyyy"),
      }));
    }
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    clearTimeout(scrollTimeoutRef.current);
    clearTimeout(apiTimeoutRef.current);

    if (!searchData.origin || !searchData.destination) {
      setError("Please enter both origin and destination");
      setLoading(false);
      return;
    }

    const updatedSearchData = {
      ...searchData,
      departureDate: formatDate(searchData.departureDate),
      returnDate:
        searchData.returnDate === null
          ? formatDate(new Date())
          : formatDate(searchData.returnDate),
    };
    setSearchData(updatedSearchData);

    if (isInvalidReturnDate) {
      setError("Return date cannot be before departure date");
      setLoading(false);
      return;
    }

    try {
      const [result] = await Promise.all([
        searchFlights(updatedSearchData),
        new Promise(
          (resolve) => (apiTimeoutRef.current = setTimeout(resolve, 1500))
        ),
      ]);

      setResults(result);
      const flights = result.map((item) => item.flights);
      setFlightResults(flights.flat());

      setIsSubmit(true);

      scrollTimeoutRef.current = setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCardImgUrl = (imgUrl) => {
    return `${import.meta.env.VITE_RESOURCE_PATH_URL}/${imgUrl}`;
  };

  const formatFlightDate = (departureDate, arrivalDate) => {
    if (!departureDate || !arrivalDate) return "N/A";

    const departDate = parseISO(departureDate);
    const arriveDate = parseISO(arrivalDate);

    // Same day (e.g., "15 Dec, 2023")
    if (isSameDay(departDate, arriveDate)) {
      return format(departDate, "d MMM, yyyy");
    }

    // Same month (e.g., "15 - 18 Dec, 2023")
    if (isSameMonth(departDate, arriveDate)) {
      return `${format(departDate, "d")} - ${format(
        arriveDate,
        "d MMM, yyyy"
      )}`;
    }

    // Different months (e.g., "28 Dec - 2 Jan, 2024")
    return `${format(departDate, "d MMM")} - ${format(
      arriveDate,
      "d MMM, yyyy"
    )}`;
  };
  const formatFlightDuration = (departureTime, arrivalTime) => {
    const [depHours, depMins] = departureTime.split(":").map(Number);
    const [arrHours, arrMins] = arrivalTime.split(":").map(Number);

    let totalHours = arrHours - depHours;
    let totalMins = arrMins - depMins;

    if (totalMins < 0) {
      totalHours -= 1;
      totalMins += 60;
    }

    if (totalHours < 0) {
      totalHours += 24;
    }

    return `${totalHours} hr ${totalMins} m`;
  };
  const onModifySearch = () => {
    clearTimeout(modifySearchTimeoutRef.current);

    searchSectionRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    modifySearchTimeoutRef.current = setTimeout(() => {
      setIsSubmit(false);
    }, 500);
  };
  const isInvalidReturnDate =
    searchData.returnDate &&
    isBefore(searchData.returnDate, searchData.departureDate);

  const labelToTravelClass = {
    Economy: "Economy",
    "First Class": "FirstClass",
  };

  return (
    <main>
      {/* Flight Search Section */}
      <section className="flex mb-56 pl-20 mt-5" ref={searchSectionRef}>
        <div className="basis-1/2">
          <form
            action="#"
            method="post"
            onSubmit={handleSearchSubmit}
            className="max-w-[650px]"
          >
            <h1 className="text-[40px] font-bold text-neutral-900 mb-5">
              Find your flight
            </h1>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            {/* Trip Options */}
            <div className="flex gap-5 items-center mb-5">
              <Tag
                title="Round trip"
                icon={compareArrows}
                isActive={searchData.tripType === "RoundTrip"}
                onClick={() => handleTripTypeChange("RoundTrip")}
              />
              <Tag
                title="One way"
                icon={rightArrow}
                isActive={searchData.tripType === "OneWay"}
                onClick={() => handleTripTypeChange("OneWay")}
              />
              <hr className="w-[1px] h-7 bg-gray-400 border-0 transform rotate-180 block" />

              <Tag
                icon={accountIcon}
                title={searchData.passengerCount.toString()}
                textColor="text-blue-600"
              />

              <DropDown
                icon={ticketOutlined}
                arrowIcon={arrowDownOutliened}
                bgColor="bg-[#F0F0FFFF]"
                title={searchData.travelClass}
                textColor="text-blue-600"
                options={["Economy", "First Class"]}
                hover="hover:bg-[#CECEFFFF]"
                hoverActive="hover:active:bg-[#ADADFFFF]"
                onSelect={handleTravelClassChange}
              />
            </div>

            <div className="mb-5">
              <SearchBar
                originValue={searchData.origin}
                destinationValue={searchData.destination}
                onChange={handleInputChange}
                loading={loading}
              />
            </div>

            {/* Date Selection */}
            <div className="space-y-4 relative">
              {/* Departure Date */}
              <button
                type="button"
                className="flex items-center gap-2 bg-[#FF912BFF] text-white text-base px-4 h-11 rounded-[22px] hover:bg-[#E87000FF] hover:active:bg-[#C96100FF] transition-all duration-150"
                onClick={() => {
                  setShowDepartureCalendar(!showDepartureCalendar);
                  setShowReturnCalendar(false);
                }}
              >
                <img
                  style={{ filter: "brightness(0) invert(1)" }}
                  src={calendarIcon}
                  alt="calendar icon"
                />
                <span>
                  {searchData.departureDate
                    ? format(searchData.departureDate, "dd MMM, yyyy")
                    : "Departure date"}
                </span>
              </button>

              {showDepartureCalendar && (
                <div className={`absolute z-10 top-[-17%] left-[27%]`}>
                  <Calendar
                    selectedDate={searchData.departureDate}
                    onDateSelect={handleDepartureDateSelect}
                    mode={"departure"}
                  />
                </div>
              )}

              {/* Return Date */}
              {searchData.tripType === "RoundTrip" && (
                <>
                  <button
                    type="button"
                    className={`flex gap-2 items-center text-base px-4 text-[#FF912BFF]
                      hover:bg-[#FFEAD7FF] hover:active:bg-[#FFDDBEFF] rounded-[22px] h-11 transition-all duration-150`}
                    onClick={() => {
                      setShowReturnCalendar(!showReturnCalendar);
                      setShowDepartureCalendar(false);
                    }}
                  >
                    <img src={orangeCalendarIcon} alt="orange calendar icon" />
                    <span>
                      {getReturnDateDisplay()}
                      {isInvalidReturnDate && (
                        <span className="text-xs text-red-500 ml-2">
                          (Invalid date)
                        </span>
                      )}
                    </span>
                  </button>

                  {showReturnCalendar && (
                    <div className="absolute z-10 top-[48%] left-[27%]">
                      <Calendar
                        selectedDate={searchData.returnDate}
                        onDateSelect={handleReturnDateSelect}
                        minDate={searchData.departureDate}
                        mode={"Return"}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </form>
        </div>

        <div className="basis-1/2">
          <div className="translate-y-[46%]">
            <img src={earthImage} alt="Earth illustration" />
          </div>
        </div>
      </section>
      {/* Destinations Section */}
      {isSubmit && (
        <section className="bg-[#F8F9FAFF]" ref={resultsRef}>
          <div className="p-20">
            <div className="flex justify-between items-center mb-7">
              <h1 className="flex text-2xl text-neutral-900 font-bold">
                <img src={pinIcon} alt="navigation icon" />
                <span className="mr-1">Trip from</span>
                <span className="text-[#0FBE86FF] capitalize">
                  {searchData.origin}
                </span>
              </h1>
              {flightResults && flightResults.length > 0 && (
                <button
                  onClick={handleExploreDestination}
                  className="px-[12px] text-base font-normal text-white bg-neutral-900 rounded-[18px] h-10 hover:bg-neutral-700 active:bg-neutral-600 transition-all duration-150 flex items-center justify-center"
                >
                  Explore destination
                </button>
              )}
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading flights...</p>
              </div>
            ) : error ? (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            ) : flightResults && flightResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No flights found
                </h3>
                <p className="text-gray-500 max-w-md">
                  We couldn't find any flights matching your criteria. Try
                  adjusting your search filters or dates.
                </p>
                <button
                  onClick={onModifySearch}
                  className="mt-4 px-4 py-2 bg-[#11D396FF] text-white rounded-[22px] 
                  hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF] transition-all 
                  duration-250"
                >
                  Modify Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-8">
                {flightResults &&
                  flightResults
                    .filter((_, i) => i < 2)
                    .map((item, index) => (
                      <Card
                        key={index}
                        cardImg={formatCardImgUrl(item.destinationImageUrl)}
                        timeIcon={sunriseIcon}
                        flightDate={formatFlightDate(
                          item.departureDate,
                          item.arrivalDate
                        )}
                        flightHours={formatFlightDuration(
                          item.departureTime,
                          item.arrivalTime
                        )}
                        cityName={item.destination}
                        price={item.basePrice}
                      />
                    ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
