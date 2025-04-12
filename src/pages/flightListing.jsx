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
import { useEffect, useState } from "react";
import FlightModal from "../components/flightListingPageComponents/FlightModalComponents/flightDetailsModalComponent";
import windPowerIcon from "../images/windPowerIcon.svg";
import cactusIcon from "../images/cactus.svg";
import forestIcon from "../images/forest.svg";
import cloudIcon from "../images/soundCloud.svg";
import compareArrows from "../images/material-compareArrows-Outlined.svg";
import { useLocation, useSearchParams } from "react-router-dom";
import { getAirlineById } from "../services/airlineService";
import { getFlightByFlightNumber } from "../services/flightService";
import { getBaggageById } from "../services/baggageService";
import { Modal } from "@mui/material";

const FlightList = () => {
  const [openModal, setModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

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
    departureDate: departureDate || "",
    returnDate: returnDate || "",
    passengerCount: passengerCount ? parseInt(passengerCount) : 1,
    travelClass: travelClass || "Economy",
    tripType: tripType || "OneWay",
  });

  const location = useLocation();
  const itineraryResults = location.state?.results || [];
  const [loadingAirlines, setLoadingAirlines] = useState(false);
  const [flights, setFlights] = useState([]);
  const [apiFlights, setApiFlights] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 500, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (itineraryResults.length === 0) {
        setLoadingAirlines(false);
        return;
      }

      try {
        setLoadingAirlines(true);

        const flightNumbers = itineraryResults.flatMap((it) =>
          it.flights.map((flight) => flight.flightNumber)
        );
        const uniqueFlightNumbers = [...new Set(flightNumbers)];
        const flightPromises = uniqueFlightNumbers.map((flightNumber) =>
          getFlightByFlightNumber(flightNumber)
        );
        const flights = await Promise.all(flightPromises);
        setFlights(flights);

        const airlinesIds = [
          ...new Set(itineraryResults.map((it) => it.itinerary.airlineId)),
        ];
        const airlineResponses = await Promise.all(
          airlinesIds.map((id) => getAirlineById(id))
        );

        const airlinesMap = airlineResponses.reduce((acc, airline) => {
          if (airline) acc[airline.id] = airline;
          return acc;
        }, {});

        const mergedFlights = itineraryResults.map((itinerary) => {
          const airline = airlinesMap[itinerary.itinerary.airlineId] || {};

          return {
            airlineId: itinerary.airlineId,
            airlineIcon: getAirlineIcon(airline.airlineImageUrl),
            airlineBgColor: getAirlineBgColor(airline.airlineBgColor),
            airlineName: airline.name,
            flightDepartureTime: itinerary.itinerary.departureTime,
            flightArrivalTime: itinerary.itinerary.arrivalTime || "",
            flightPrice: itinerary.itinerary.totalPrice || 0,
            stopsNumber: itinerary.flights.length - 1,
            bagCapacity: 23,
          };
        });

        setApiFlights(mergedFlights);
        await delay(2000);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      } finally {
        setLoadingAirlines(false);
      }
    };

    fetchData();
  }, [itineraryResults]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getAirlineIcon = (airlineIconName) => {
    if (airlineIconName)
      return `${import.meta.env.VITE_RESOURCE_PATH_URL}/${airlineIconName}`;
    return cloudIcon;
  };
  const getAirlineBgColor = (bgColor) => {
    const airlineBgColor = `bg-[${bgColor}]`;
    return airlineBgColor;
  };

  const tripTypeIcon = tripType === "RoundTrip" ? compareArrows : rightArrow;

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
  const handleTripTypeChange = (selectedLabel) => {
    const serverFormat = labelToTripType[selectedLabel];
    setFormData((prev) => ({ ...prev, tripType: serverFormat }));
  };
  const handleTravelClassChange = (selectedLabel) => {
    const serverFormat = labelToTravelClass[selectedLabel];
    setFormData((prev) => ({ ...prev, travelClass: serverFormat }));
  };

  const handleModalOpen = () => {
    setModalOpen((prev) => !prev);
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  return (
    <section className="px-20 py-5">
      <div className="mb-5">
        <img src={worldExplorer} alt="Explore world image " />
      </div>

      <div className="flex gap-5">
        <div className="basis-[25%]">
          <SortTable />
          <FilterTable />
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
              onDateSelect={(date) => {
                setFormData({
                  ...formData,
                  departureDate: date,
                });
              }}
              onReturnDateSelect={(date) => {
                setFormData({
                  ...formData,
                  returnDate: date,
                });
              }}
              departureDate={formData.departureDate}
              returnDate={formData.returnDate}
              tripType={formData.tripType}
            />
            <button
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
          {/*End of search components */}

          {/*Calendar planner */}
          <div className="mb-10">
            <Planner
              handleModalOpen={handleModalOpen}
              flightsInfo={apiFlights}
              isLoading={loadingAirlines}
            />
          </div>

          {/*Pagination */}
          <div className="mb-16 flex justify-end">
            <Pagination
              count={apiFlights.length}
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

      {/*Modal Flight Details Modal*/}
      <section className="z-20">
        {apiFlights.length > 0 && (
          <FlightModal
            openModal={openModal}
            flightDetails={apiFlights}
            setModalOpen={setModalOpen}
          />
        )}
      </section>
    </section>
  );
};

export default FlightList;
