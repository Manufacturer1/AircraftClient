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
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";

const flightsInfo = [
  {
    airlineIcon: windPowerIcon,
    airlineBgColor: "bg-[#6ECFBDFF]",
    airlineName: "HorizonJet",
    bagCapacity: 23,
    flightDepartureTime: "10:25 PM",
    flightArrivalTime: "07:06 AM",
    flightPrice: 275.5,
    stopsNumber: 1,
  },
  {
    airlineIcon: forestIcon,
    airlineBgColor: "bg-[#FF912BFF]",
    airlineName: "Altitude Airways",
    bagCapacity: 23,
    flightDepartureTime: "06:30 AM",
    flightArrivalTime: "07:55 AM",
    flightPrice: 206,
    stopsNumber: 1,
  },
  {
    airlineIcon: cloudIcon,
    airlineBgColor: "bg-[#0D78C9FF]",
    airlineName: "Cloudy Airlines",
    bagCapacity: 23,
    flightDepartureTime: "01:19 PM",
    flightArrivalTime: "02:45 PM",
    flightPrice: 148.5,
    stopsNumber: 1,
  },
  {
    airlineIcon: cloudIcon,
    airlineBgColor: "bg-[#0D78C9FF]",
    airlineName: "Cloudy Airlines",
    bagCapacity: 23,
    flightDepartureTime: "06:13 PM",
    flightArrivalTime: "07:40 PM",
    flightPrice: 380.15,
    stopsNumber: 1,
  },
  {
    airlineIcon: forestIcon,
    airlineBgColor: "bg-[#FF912BFF]",
    airlineName: "Altitude Airways",
    bagCapacity: 23,
    flightDepartureTime: "06:20 AM",
    flightArrivalTime: "07:46 AM",
    flightPrice: 269.1,
    stopsNumber: 2,
  },
  {
    airlineIcon: windPowerIcon,
    airlineBgColor: "bg-[#6ECFBDFF]",
    airlineName: "HorizonJet",
    bagCapacity: 23,
    flightDepartureTime: "7:25 PM",
    flightArrivalTime: "08:45 PM",
    flightPrice: 549.1,
    stopsNumber: 0,
  },
  {
    airlineIcon: windPowerIcon,
    airlineBgColor: "bg-[#6ECFBDFF]",
    airlineName: "HorizonJet",
    bagCapacity: 23,
    flightDepartureTime: "06:01 AM",
    flightArrivalTime: "07:28 AM",
    flightPrice: 200.5,
    stopsNumber: 0,
  },
  {
    airlineIcon: cactusIcon,
    airlineBgColor: "bg-[#E5343AFF]",
    airlineName: "FlyScape",
    bagCapacity: 23,
    flightDepartureTime: "08:40 AM",
    flightArrivalTime: "10:00 AM",
    flightPrice: 549.1,
    stopsNumber: 0,
  },
];

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
              flightsInfo={flightsInfo}
            />
          </div>

          {/*Pagination */}
          <div className="mb-16 flex justify-end">
            <Pagination
              count={11}
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
        <FlightModal
          openModal={openModal}
          setModalOpen={setModalOpen}
          flightDetails={flightsInfo[2]}
        />
      </section>
    </section>
  );
};

export default FlightList;
