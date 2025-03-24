import worldExplorer from "../images/explore_world.png";
import SortTable from "../components/sortComponent";
import FilterTable from "../components/filterComponent";
import DropDown from "../components/dropDownMenu";
import dropDownIcon from "../images/dropDownIcon.svg";
import rightArrow from "../images/rightArrow.svg";
import meetingIcon from "../images/meetingIcon.svg";
import blackTicketIcon from "../images/blackTicketIcon.svg";
import FindInput from "../components/findInputComponent";
import gpsIcon from "../images/gpsIcon.svg";
import swapArrowsIcon from "../images/material-CompareArrows-Outlined.svg";
import calendarIcon from "../images/calendarIcon.svg";
import unfoldIcon from "../images/unfoldIcon.svg";
import searchIcon from "../images/searchOutlined.svg";
import Planner from "../components/plannerComponent";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import FlightModal from "../components/flightDetailsModalComponent";
import windPowerIcon from "../images/windPowerIcon.svg";
import cactusIcon from "../images/cactus.svg";
import forestIcon from "../images/forest.svg";
import cloudIcon from "../images/soundCloud.svg";

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

  const handleModalOpen = () => {
    setModalOpen((prev) => !prev);
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
                title={"One way"}
                icon={rightArrow}
                iconSizes={"w-6"}
                arrowIcon={dropDownIcon}
                textColor={"text-neutral-700"}
                bgColor={"bg-[#F3F4F6FF]"}
                options={["One way", "Round trip"]}
              />
            </div>
            <div>
              <button className="flex items-center px-3 py-2 bg-[#F3F4F6FF] rounded-[18px] justify-center gap-1">
                <img src={meetingIcon} />
                <span>1</span>
              </button>
            </div>
            <div>
              <DropDown
                title={"Economy"}
                icon={blackTicketIcon}
                textColor={"text-neutral-700"}
                arrowIcon={dropDownIcon}
                bgColor={"bg-[#F3F4F6FF]"}
                options={["Economy", "First Class"]}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-7">
            <FindInput defaultText={"Houston (HOU)"} icon={gpsIcon} />
            <img className="w-10" src={swapArrowsIcon} />
            <FindInput defaultText={"Los Angeles (LAX)"} icon={gpsIcon} />
            <FindInput
              defaultText={"9/12/2023 - 12/2/2023"}
              icon={calendarIcon}
              optionalIcon={unfoldIcon}
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
