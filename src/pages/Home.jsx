import { useState } from "react";
import { Link } from "react-router-dom";
import { format, isBefore } from "date-fns";
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
import americanMap from "../images/americanMap.png";
import newYorkImage from "../images/newYork.jpg";
import losAngelesImage from "../images/losAngeles.jpg";
import sunriseIcon from "../images/sunriseIcon.svg";

const Home = () => {
  // State management
  const [tripType, setTripType] = useState("round-trip");
  const [passengerCount, setPassengerCount] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);

  // Flight cards data
  const cardInfo = [
    {
      cityName: "New York",
      cityImg: newYorkImage,
      timeIcon: sunriseIcon,
      flightDate: "9 - 10 Feb, 2023",
      flightHours: "7 hr 15 m",
      price: "$294",
    },
    {
      cityName: "Los Angeles",
      cityImg: losAngelesImage,
      timeIcon: sunriseIcon,
      flightDate: "9 - 10 Feb, 2023",
      flightHours: "6 hr 18 m",
      price: "$399",
    },
  ];

  // Handlers
  const handleTripTypeChange = (type) => {
    setTripType(type);
    if (type === "one-way") {
      setReturnDate(null); // Clear return date for one-way trips
    } else if (departureDate) {
      setReturnDate(departureDate); // Set return to match departure for round trips
    }
  };

  const handleDepartureDateSelect = (date) => {
    setDepartureDate(date);
    if (tripType === "round-trip") {
      setReturnDate(date); // Auto-update return date for round trips
    }
    setShowDepartureCalendar(false);
  };

  const handleReturnDateSelect = (date) => {
    setReturnDate(date);
    setShowReturnCalendar(false);
  };

  // Helper functions
  const getReturnDateDisplay = () => {
    if (returnDate) return format(returnDate, "MMM d, yyyy");
    if (tripType === "round-trip" && departureDate)
      return format(departureDate, "MMM d, yyyy");
    return "Return date";
  };

  const isInvalidReturnDate = returnDate && isBefore(returnDate, departureDate);

  return (
    <main>
      {/* Flight Search Section */}
      <section className="flex mb-56 pl-20 mt-5">
        <div className="basis-1/2">
          <div className="max-w-[650px]">
            <h1 className="text-[40px] font-bold text-neutral-900 mb-5">
              Find your flight
            </h1>

            {/* Trip Options */}
            <div className="flex gap-5 items-center mb-5">
              <Tag
                title="Round trip"
                icon={compareArrows}
                isActive={tripType === "round-trip"}
                onClick={() => handleTripTypeChange("round-trip")}
              />
              <Tag
                title="One way"
                icon={rightArrow}
                isActive={tripType === "one-way"}
                onClick={() => handleTripTypeChange("one-way")}
              />
              <hr className="w-[1px] h-7 bg-gray-400 border-0 transform rotate-180 block" />

              <DropDown
                icon={accountIcon}
                arrowIcon={arrowIcon}
                bgColor="bg-[#F0F0FFFF]"
                title={passengerCount.toString()}
                textColor="text-blue-600"
                options={["1", "2", "3", "4", "5"]}
                hover="hover:bg-[#CECEFFFF]"
                hoverActive="hover:active:bg-[#ADADFFFF]"
                onSelect={(value) => setPassengerCount(parseInt(value))}
              />

              <DropDown
                icon={ticketOutlined}
                arrowIcon={arrowDownOutliened}
                bgColor="bg-[#F0F0FFFF]"
                title={travelClass}
                textColor="text-blue-600"
                options={["Economy", "Business Class"]}
                hover="hover:bg-[#CECEFFFF]"
                hoverActive="hover:active:bg-[#ADADFFFF]"
                onSelect={(value) => setTravelClass(value)}
              />
            </div>

            <div className="mb-5">
              <SearchBar />
            </div>

            {/* Date Selection */}
            <div className="space-y-4 relative">
              {/* Departure Date */}
              <button
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
                  {departureDate
                    ? format(departureDate, "MMM d, yyyy")
                    : "Departure date"}
                </span>
              </button>

              {showDepartureCalendar && (
                <div className={`absolute z-10 top-[-17%] left-[27%]`}>
                  <Calendar
                    selectedDate={departureDate}
                    onDateSelect={handleDepartureDateSelect}
                  />
                </div>
              )}

              {/* Return Date */}
              {tripType === "round-trip" && (
                <>
                  <button
                    className={`flex gap-2 items-center text-base px-4
                      ${
                        isInvalidReturnDate
                          ? "text-red-500"
                          : "text-[#FF912BFF]"
                      }
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
                        selectedDate={returnDate}
                        onDateSelect={handleReturnDateSelect}
                        minDate={departureDate}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="basis-1/2">
          <div className="translate-y-[46%]">
            <img src={earthImage} alt="Earth illustration" />
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="bg-[#F8F9FAFF]">
        <div className="p-20">
          <div className="flex justify-between items-center mb-7">
            <h1 className="flex text-2xl text-neutral-900 font-bold">
              <img src={pinIcon} alt="navigation icon" />
              <span className="mr-1">Trip from</span>
              <span className="text-[#0FBE86FF]">Houston</span>
            </h1>
            <Link
              to="/flights"
              className="px-[12px] text-base font-normal text-white bg-neutral-900 rounded-[18px] h-10 hover:bg-neutral-700 active:bg-neutral-600 transition-all duration-150 flex items-center justify-center"
            >
              Explore destination
            </Link>
          </div>

          <div className="w-full rounded-md mb-9">
            <img
              className="object-fill block w-full rounded-md"
              src={americanMap}
              alt="American map"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            {cardInfo.map((item, index) => (
              <Card
                key={index}
                cityName={item.cityName}
                cardImg={item.cityImg}
                flightDate={item.flightDate}
                flightHours={item.flightHours}
                timeIcon={item.timeIcon}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
