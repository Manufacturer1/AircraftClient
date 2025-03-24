import Tag from "../components/tagComponent";
import compareArrows from "../images/material-compareArrows-Outlined.svg";
import rightArrow from "../images/rightArrow.svg";
import DropDown from "../components/dropDownMenu";
import accountIcon from "../images/accountIcon.svg";
import arrowIcon from "../images/arrowIcon.svg";
import arrowDownOutliened from "../images/arrowDownOutliened.svg";
import ticketOutlined from "../images/ticketOutlined.svg";
import calendarIcon from "../images/calendarIcon.svg";
import orangeCalendarIcon from "../images/orangeCalendarIcon.svg";
import SearchBar from "../components/searchBarComponent";
import earthImage from "../images/earth_image.png";
import pinIcon from "../images/pin.svg";
import americanMap from "../images/americanMap.png";
import Card from "../components/cardComponent";
import newYorkImage from "../images/newYork.jpg";
import losAngelesImage from "../images/losAngeles.jpg";
import sunriseIcon from "../images/sunriseIcon.svg";
import { Link } from "react-router-dom";

const Home = () => {
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

  return (
    <main>
      <section className="flex mb-56 pl-20 mt-5">
        <div className="basis-1/2">
          <div className="max-w-[650px]">
            <h1 className="text-[40px] font-bold text-neutral-900 mb-5">
              Find your flight
            </h1>
            <div className="flex gap-5 items-center mb-5">
              <Tag title={"Round trip"} icon={compareArrows} />
              <Tag title={"One way"} icon={rightArrow} />
              <hr className="w-[1px] h-7 bg-gray-400 border-0 transform rotate-180 block" />
              <DropDown
                icon={accountIcon}
                arrowIcon={arrowIcon}
                bgColor={"bg-[#F0F0FFFF]"}
                title={"1"}
                textColor={"text-blue-600"}
                options={["1", "2", "3", "4", "5"]}
              />

              <DropDown
                icon={ticketOutlined}
                arrowIcon={arrowDownOutliened}
                bgColor={"bg-[#F0F0FFFF]"}
                title={"Enonomy"}
                textColor={"text-blue-600"}
                options={["Economy", "Buisness Class"]}
              />
            </div>
            <div className="mb-5">
              <SearchBar />
            </div>

            <div className="space-y-4">
              <button
                className="flex items-center 
                    gap-2 bg-[#FF912BFF]
                     text-white text-base 
                     px-4 h-11 rounded-[22px]
                     hover:bg-[#E87000FF] hover:active:bg-[#C96100FF] transition-all duration-150"
              >
                <img
                  style={{ filter: "brightness(0) invert(1)" }}
                  src={calendarIcon}
                  alt="calendar icon"
                />
                <span>Departure date</span>
              </button>
              <button
                className="flex gap-2 items-center text-base text-[#FF912BFF] px-4
                    hover:bg-[#FFEAD7FF] hover:active:bg-[#FFDDBEFF] rounded-[22px] h-11 transition-all duration-150"
              >
                <img src={orangeCalendarIcon} alt="orange calendar icon" />
                <span>Returned date</span>
              </button>
            </div>
          </div>
        </div>

        <div className="basis-1/2">
          <div className="translate-y-[46%]">
            <img src={earthImage} />
          </div>
        </div>
      </section>

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
              className="px-[12px] text-base font-normal text-white bg-neutral-900 rounded-[18px] h-10
             hover:bg-neutral-700 active:bg-neutral-600 transition-all duration-150 flex items-center justify-center"
            >
              Explore destination
            </Link>
          </div>

          <div className="w-full rounded-md mb-9">
            <img
              className="object-fill block w-full rounded-md"
              src={americanMap}
              alt="american map of searched flight"
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
