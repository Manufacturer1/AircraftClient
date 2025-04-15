import worldExplorer from "../images/explore_world.png";
import SortTable from "../components/flightListingPageComponents/sortComponent";
import FilterTable from "../components/flightListingPageComponents/filterComponent";
import DropDown from "../components/generalUseComponents/dropDownMenu";
import dropDownIcon from "../images/dropDownIcon.svg";
import rightArrow from "../images/rightArrow.svg";
import meetingIcon from "../images/meetingIcon.svg";
import blackTicketIcon from "../images/blackTicketIcon.svg";
import FindInput from "../components/flightListingPageComponents/findInputComponent";
import gpsIcon from "../images/gpsIcon.svg";
import swapArrowsIcon from "../images/material-CompareArrows-Outlined.svg";
import calendarIcon from "../images/calendarIcon.svg";
import unfoldIcon from "../images/unfoldIcon.svg";
import searchIcon from "../images/searchOutlined.svg";
import Planner from "../components/flightListingPageComponents/plannerComponents/plannerComponent";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState, useRef } from "react";
import FlightModal from "../components/flightListingPageComponents/FlightModalComponents/flightDetailsModalComponent";
import cloudIcon from "../images/soundCloud.svg";
import compareArrows from "../images/material-compareArrows-Outlined.svg";
import { useLocation, useSearchParams } from "react-router-dom";
import { getAirlineById } from "../services/airlineService";
import { getFlightByFlightNumber } from "../services/flightService";
import { getBaggageById } from "../services/baggageService";
import { searchFlights } from "../services/flightService";
import { format } from "date-fns";
import { searchFlightsWithoutDate } from "../services/flightService";

const convertToDisplayFormat = (date) => {
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
const compareDates = (flightDate, scheduleDate) => {
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

const createDateSchedule = () => {
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
const tripTypeToLabel = {
  OneWay: "One way",
  RoundTrip: "Round trip",
};

const labelToTripType = {
  "One way": "OneWay",
  "Round trip": "RoundTrip",
};
const travelClassToLabel = {
  Economy: "Economy",
  FirstClass: "First Class",
};

const labelToTravelClass = {
  Economy: "Economy",
  "First Class": "FirstClass",
};

const getAirlineIcon = (airlineIconName) => {
  if (airlineIconName)
    return `${import.meta.env.VITE_RESOURCE_PATH_URL}/${airlineIconName}`;
  return cloudIcon;
};
const getAirlineBgColor = (bgColor) => {
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
const formatDateToString = (date) => {
  if (!date) return null;
  if (typeof date === "string") return date;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const convertToApiFormat = (date) => {
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
const FlightList = () => {
  const [openModal, setModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [schedule, setSchedule] = useState(createDateSchedule());

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departureDate = searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate");
  const passengerCount = searchParams.get("passengerCount");
  const travelClass = searchParams.get("travelClass");
  const tripType = searchParams.get("tripType");

  const [formData, setFormData] = useState({
    origin: origin || "",
    destination: destination || "",
    departureDate: departureDate ? convertToDisplayFormat(departureDate) : "",
    returnDate: returnDate ? convertToDisplayFormat(returnDate) : null,
    passengerCount: passengerCount ? parseInt(passengerCount) : 1,
    travelClass: travelClass || "Economy",
    tripType: tripType || "OneWay",
  });

  const location = useLocation();
  const itineraryResults = location.state?.results || [];
  const [flights, setFlights] = useState([]);
  const [apiFlights, setApiFlights] = useState([]);
  const [baggages, setBaggages] = useState([]);
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(0);
  const [itineraries, setItineraries] = useState(itineraryResults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const flightsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const [flightsWithoutDate, setFlightsWithoutDate] = useState([]);
  const [unfilteredFlights, setUnfilteredFlights] = useState(itineraries);
  const [transitFilter, setTransitFilter] = useState(null);
  const [sortType, setSortType] = useState(null);

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = apiFlights.slice(
    indexOfFirstFlight,
    indexOfLastFlight
  );

  const updateSearchParams = (formData) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("origin", formData.origin);
    newSearchParams.set("destination", formData.destination);
    newSearchParams.set("departureDate", formData.departureDate);
    newSearchParams.set("passengerCount", formData.passengerCount.toString());
    newSearchParams.set("travelClass", formData.travelClass);
    newSearchParams.set("tripType", formData.tripType);

    if (formData.tripType === "RoundTrip" && formData.returnDate) {
      newSearchParams.set("returnDate", formData.returnDate);
    } else {
      newSearchParams.delete("returnDate");
    }

    setSearchParams(newSearchParams);
  };
  useEffect(() => {
    window.scrollTo({ top: 500, behavior: "smooth" });
  }, []);
  const fetchData = async () => {
    try {
      setLoading(false);
      const flightNumbers = itineraries.flatMap((it) =>
        it.flights.map((flight) => flight.flightNumber)
      );

      const uniqueFlightNumbers = [...new Set(flightNumbers)];
      const flightPromises = uniqueFlightNumbers.map((flightNumber) =>
        getFlightByFlightNumber(flightNumber)
      );
      const flights = await Promise.all(flightPromises);
      setFlights(flights);

      // 2. Fetch all airlines
      const airlinesIds = [
        ...new Set(itineraries.map((it) => it.itinerary.airlineId)),
      ];
      const airlineResponses = await Promise.all(
        airlinesIds.map((id) => getAirlineById(id))
      );

      // Create airline map
      const airlinesMap = airlineResponses.reduce((acc, airline) => {
        if (airline) acc[airline.id] = airline;
        return acc;
      }, {});

      // 3. Fetch all baggage policies
      const baggageIds = [
        ...new Set(
          airlineResponses
            .map((airline) => airline.baggagePolicyId)
            .filter(Boolean)
        ),
      ];
      const baggagePromises = baggageIds.map((id) => getBaggageById(id));
      const baggageResponses = await Promise.all(baggagePromises);
      setBaggages(baggageResponses);

      // Create baggage map
      const baggageMap = baggageResponses.reduce((acc, baggage) => {
        if (baggage) acc[baggage.id] = baggage;
        return acc;
      }, {});

      // 4. Merge all data
      const mergedFlights = itineraries.map((itinerary) => {
        const airline = airlinesMap[itinerary.itinerary.airlineId] || {};
        const baggage = baggageMap[airline.baggagePolicyId] || {};

        return {
          airlineId: itinerary.itinerary.airlineId,
          airlineIcon: getAirlineIcon(airline.airlineImageUrl),
          airlineBgColor: getAirlineBgColor(airline.airlineBgColor),
          airlineName: airline.name || "Unknown Airline",
          flightDepartureTime: itinerary.itinerary.departureTime,
          flightArrivalTime: itinerary.itinerary.arrivalTime || "",
          flightPrice: itinerary.itinerary.totalPrice || 0,
          stopsNumber: itinerary.flights.length - 1,
          bagCapacity: baggage.checkedWeightLimitKg || 0,
          departureDate: itinerary.itinerary.departureDate,
        };
      });

      setApiFlights(mergedFlights);
      searchForAllFlightsWithoutDate();

      if (itineraries.length > 0) {
        const firstFlightDate = itineraries[0].itinerary.departureDate;
        const plannerIndex = schedule.findIndex((item) =>
          compareDates(firstFlightDate, item.date)
        );
        if (plannerIndex !== -1) {
          setSelectedIndex(plannerIndex);
        }
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchForAllFlightsWithoutDate = async () => {
    try {
      const allFlights = await searchFlightsWithoutDate(formData);
      const filteredFlights = filterFlightsByTransit(allFlights, transitFilter);
      setFlightsWithoutDate(filteredFlights);
      setDateOnPlanner(filteredFlights);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const setDateOnPlanner = (flights) => {
    if (flights.length > 0) {
      const updatedSchedule = schedule.map((dateItem) => {
        const matchingFlights = flights.filter((flight) => {
          return compareDates(flight.itinerary.departureDate, dateItem.date);
        });

        if (matchingFlights.length > 0) {
          const minPrice = Math.min(
            ...matchingFlights.map((f) => parseFloat(f.itinerary.totalPrice))
          );
          return {
            ...dateItem,
            price: `${minPrice.toFixed(1)} USD`,
            hasFlights: true,
          };
        }
        return {
          ...dateItem,
          price: "No Flight",
          hasFlights: false,
        };
      });

      setSchedule(updatedSchedule);
    } else {
      const resetSchedule = schedule.map((dateItem) => ({
        ...dateItem,
        price: "No Flight",
        hasFlights: false,
      }));
      setSchedule(resetSchedule);
    }
  };
  useEffect(() => {
    fetchData();
  }, [itineraries]);

  const tripTypeIcon = tripType === "RoundTrip" ? compareArrows : rightArrow;

  const handleTripTypeChange = (selectedLabel) => {
    const serverFormat = labelToTripType[selectedLabel];
    const newFormData = {
      ...formData,
      tripType: serverFormat,
      returnDate: serverFormat === "OneWay" ? null : formData.returnDate,
    };
    setFormData(newFormData);
    updateSearchParams(newFormData);
  };
  const handleTravelClassChange = (selectedLabel) => {
    const serverFormat = labelToTravelClass[selectedLabel];
    const newFormData = { ...formData, travelClass: serverFormat };
    setFormData(newFormData);
    updateSearchParams(newFormData);
  };

  const handleModalOpen = () => {
    setModalOpen((prev) => !prev);
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    updateSearchParams(newFormData);
  };

  const handleDateChange = (date, isReturnDate = false) => {
    const formattedDate = formatDateToString(date);
    const newFormData = isReturnDate
      ? { ...formData, returnDate: formattedDate }
      : { ...formData, departureDate: formattedDate };

    setFormData(newFormData);
    updateSearchParams(newFormData);
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCurrentPage(1);
    setItineraries([]);

    if (!formData.destination || !formData.origin) {
      setError("Please enter both origin and destination.");
      setLoading(false);
      return;
    }

    if (formData.tripType === "RoundTrip" && !formData.returnDate) {
      setError("Choose a return date before submitting.");
      setLoading(false);
      return;
    }
    const apiFormattedData = {
      ...formData,
      departureDate: convertToApiFormat(formData.departureDate),
      returnDate:
        formData.tripType === "OneWay"
          ? convertToApiFormat(formData.departureDate)
          : formData.returnDate
          ? convertToApiFormat(formData.returnDate)
          : null,
    };
    setFormData(apiFormattedData);

    try {
      const searchData = await searchFlights(apiFormattedData);
      const filteredData = filterFlightsByTransit(searchData, transitFilter);

      if (!searchData || searchData.length === 0) {
        setLoading(false);
        setError("No flights found for your selected criteria.");
        return;
      }
      setItineraries(filteredData);
      setUnfilteredFlights(searchData);
      setDateOnPlanner(filteredData);
    } catch (error) {
      setError(error.message);
      setItineraries([]);
      setDateOnPlanner([]);
      setUnfilteredFlights([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (origin && destination && departureDate) {
      const fetchInitialResults = async () => {
        try {
          setLoading(true);

          const apiFormattedData = {
            origin,
            destination,
            departureDate: convertToApiFormat(departureDate),
            returnDate:
              tripType === "OneWay"
                ? convertToApiFormat(departureDate)
                : returnDate
                ? convertToApiFormat(returnDate)
                : null,
            passengerCount: passengerCount ? parseInt(passengerCount) : 1,
            travelClass: travelClass || "Economy",
            tripType: tripType || "OneWay",
          };

          const searchData = await searchFlights(apiFormattedData);
          const filteredData = filterFlightsByTransit(
            searchData,
            transitFilter
          );
          setItineraries(filteredData);
          setUnfilteredFlights(searchData);
          searchForAllFlightsWithoutDate();
        } catch (error) {
          console.error("Error refetching results:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchInitialResults();
    }
  }, []);
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);
  const handleDateSelectFromPlanner = (selectedDate) => {
    const dateFiltered = flightsWithoutDate.filter((item) => {
      return compareDates(item.itinerary.departureDate, selectedDate);
    });

    const transitFiltered = filterFlightsByTransit(dateFiltered, transitFilter);

    setItineraries(transitFiltered);
    setUnfilteredFlights(transitFiltered);
  };
  useEffect(() => {
    updateSearchParams(formData);
  }, []);

  const sortFlights = (flights, sortValue) => {
    const cloned = [...flights];

    if (sortValue === "lowest") {
      return cloned.sort(
        (a, b) =>
          parseFloat(a.itinerary.totalPrice) -
          parseFloat(b.itinerary.totalPrice)
      );
    } else if (sortValue === "highest") {
      return cloned.sort(
        (a, b) =>
          parseFloat(b.itinerary.totalPrice) -
          parseFloat(a.itinerary.totalPrice)
      );
    }

    return cloned;
  };

  const handleOnSortValueChange = (sortValue) => {
    setSortType(sortValue);
    const sortedFlights = sortFlights(itineraries, sortValue);
    setItineraries(sortedFlights);
  };

  const filterFlightsByTransit = (flights, filterType) => {
    if (!filterType || filterType === "") return flights;

    return flights.filter((itinerary) => {
      const stops = itinerary.flights.length - 1;
      if (filterType === "direct") return stops === 0;
      if (filterType === "one-stop") {
        return stops > 0;
      }

      return true;
    });
  };

  const handleTransitFilter = async (selectedTransit) => {
    setTransitFilter(selectedTransit);
    // if (selectedTransit === "") {
    //   setFlightsWithoutDate(await searchFlightsWithoutDate(formData));
    //   setDateOnPlanner(unfilteredFlights);
    //   setItineraries(unfilteredFlights);
    //   handleDateSelectFromPlanner(schedule[selectedIndex].date);
    //   return;
    // }
    const apiFormattedData = {
      ...formData,
      departureDate: convertToApiFormat(formData.departureDate),
      returnDate:
        formData.tripType === "OneWay"
          ? convertToApiFormat(formData.departureDate)
          : formData.returnDate
          ? convertToApiFormat(formData.returnDate)
          : null,
    };
    setFormData(apiFormattedData);

    let latestUnfilteredFlights = await searchFlights(apiFormattedData);
    if (sortType) {
      latestUnfilteredFlights = sortFlights(latestUnfilteredFlights, sortType);
    }
    setUnfilteredFlights(latestUnfilteredFlights);

    const filteredItineraries = filterFlightsByTransit(
      latestUnfilteredFlights,
      selectedTransit
    );

    const filteredFlightsWithoutDate = filterFlightsByTransit(
      await searchFlightsWithoutDate(formData),
      selectedTransit
    );

    setItineraries(filteredItineraries);
    setFlightsWithoutDate(filteredFlightsWithoutDate);
    setDateOnPlanner(filteredFlightsWithoutDate);
  };

  return (
    <section className="px-20 py-5">
      <div className="mb-5">
        <img src={worldExplorer} alt="Explore world image " />
      </div>

      <div className="flex gap-5">
        <div className="basis-[25%]">
          <SortTable onSortValueChange={handleOnSortValueChange} />
          <FilterTable onTransitChange={handleTransitFilter} />
        </div>
        <div className="basis-[75%]">
          <div className="flex items-center gap-5 mb-5">
            <div>
              <DropDown
                title={tripTypeToLabel[formData.tripType]}
                icon={tripTypeIcon}
                iconSizes={"w-6"}
                arrowIcon={dropDownIcon}
                textColor={"text-neutral-700"}
                bgColor={"bg-[#F3F4F6FF]"}
                options={["One way", "Round trip"]}
                hover={"hover:bg-[#CFD2DAFF]"}
                hoverActive={"hover:active:bg-[#A7ADB7FF]"}
                onSelect={handleTripTypeChange}
              />
            </div>
            <div>
              <button
                className="flex items-center hover:bg-[#CFD2DAFF]
               hover:active:bg-[#A7ADB7FF] transition-all duration-150 px-3 py-2
                bg-[#F3F4F6FF] rounded-[18px] justify-center gap-1"
              >
                <img src={meetingIcon} />
                <span>{formData.passengerCount}</span>
              </button>
            </div>
            <div>
              <DropDown
                title={travelClassToLabel[formData.travelClass]}
                icon={blackTicketIcon}
                textColor={"text-neutral-700"}
                arrowIcon={dropDownIcon}
                bgColor={"bg-[#F3F4F6FF]"}
                options={["Economy", "First Class"]}
                hover={"hover:bg-[#CFD2DAFF]"}
                hoverActive={"hover:active:bg-[#A7ADB7FF]"}
                onSelect={handleTravelClassChange}
              />
            </div>
          </div>
          {/*Search components*/}
          <form method="post" onSubmit={handleSearchSubmit}>
            <div className="flex items-center justify-between mb-7">
              <FindInput
                inputName="origin"
                value={formData.origin}
                onValueChange={handleInputChanges}
                defaultText={`${formData.origin}`}
                icon={gpsIcon}
              />
              <img className="w-10" src={swapArrowsIcon} />
              <FindInput
                inputName="destination"
                defaultText={`${formData.destination}`}
                value={formData.destination}
                onValueChange={handleInputChanges}
                icon={gpsIcon}
              />
              <FindInput
                icon={calendarIcon}
                optionalIcon={unfoldIcon}
                defaultText="Select date"
                isDate={true}
                onDateSelect={(date) => handleDateChange(date)}
                onReturnDateSelect={(date) => handleDateChange(date, true)}
                departureDate={formData.departureDate}
                returnDate={formData.returnDate}
                tripType={formData.tripType}
              />
              <button
                type="submit"
                className="rounded-full
             w-11 h-11 flex
              items-center 
              justify-center
               bg-[#11D396FF]
               hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF] transition-all duration-150"
              >
                <img className="w-5 h-5" src={searchIcon} />
              </button>
            </div>
          </form>
          {/*End of search components */}

          {/*Calendar planner */}
          <div className="mb-10">
            <Planner
              handleModalOpen={handleModalOpen}
              flightsInfo={currentFlights}
              loading={loading}
              onFlightSelect={setSelectedFlightIndex}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              schedule={schedule}
              error={error}
              onDateSelect={handleDateSelectFromPlanner}
            />
          </div>

          <div className="mb-16 flex justify-end">
            <Pagination
              count={Math.ceil(apiFlights.length / flightsPerPage)}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  backgroundColor: "#fff",
                  fontWeight: 400,
                  color: "#9095A0FF",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "#E5E7EB",
                  color: "#6E7787FF",
                },
                "& .Mui-selected": {
                  backgroundColor: "#11D396FF !important",
                  color: "#fff !important",
                },
                "& .Mui-selected:hover": {
                  backgroundColor: "#0FBE86FF !important",
                  color: "#fff !important",
                },
                "& .MuiPaginationItem-ellipsis": {
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "5px 5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9095A0FF",
                  fontWeight: 400,
                  cursor: "pointer",
                },
              }}
            />
          </div>
        </div>
      </div>

      <section className="z-20">
        {apiFlights.length > 0 && (
          <FlightModal
            openModal={openModal}
            flightDetails={apiFlights[selectedFlightIndex]}
            setModalOpen={setModalOpen}
          />
        )}
      </section>
    </section>
  );
};

export default FlightList;
