import { use, useState } from "react";
import CustomStepper from "../components/steeperComponent";
import BookingPriceDetails from "../components/bookingPriceDetailsComponent";
import windPowerIcon from "../images/windPowerIcon.svg";
import cactusIcon from "../images/cactus.svg";
import forestIcon from "../images/forest.svg";
import cloudIcon from "../images/soundCloud.svg";
import BookingFlightContainer from "../components/bookingFlightContainer";
import PassengerInput from "../components/passengerInputField";
import GlobeIcon from "../components/globeIconComponent";
import PassengerSelect from "../components/passengerSelectComponent";
import PassportAlert from "../components/passportAlertComponent";
import contactIcon from "../images/contact.svg";

const priceDetails = {
  tax: true,
  totalPrice: 150.0,
  discount: 1.5,
  adultFee: 150.0,
};

const bookingFlightDetails = [
  {
    airlineIcon: cloudIcon,
    airlineBgColor: "bg-[#0D78C9FF]",
    airlineName: "Cloudy Airlines",
    classType: "Economy",
    departureCity: "HOU",
    arrivalCity: "LAS",
    flightDepartureTime: "01:19 PM",
    flightArrivalTime: "02:00 PM",
    flightDepartureDate: "09/02/2023",
    isRefundable: true,
    isRescheduleAvailabe: true,
  },
  {
    airlineIcon: cloudIcon,
    airlineBgColor: "bg-[#0D78C9FF]",
    airlineName: "Cloudy Airlines",
    classType: "Economy",
    departureCity: "LAS",
    arrivalCity: "LAX",
    flightDepartureTime: "02:00 PM",
    flightArrivalTime: "02:45 PM",
    flightDepartureDate: "10/02/2023",
    isRefundable: true,
    isRescheduleAvailabe: true,
  },
];

const BookingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [nationality, setNationality] = useState("");
  const [country, setCountry] = useState("");

  return (
    <section className="px-20 py-5">
      <h2 className="text-neutral-900 text-3xl font-bold mb-2">My booking</h2>
      <section className="flex gap-24">
        {/*Passenger details section with steeper*/}
        <div className="basis-[70%] mt-14">
          {/*Steeper */}
          <div className="mb-10 max-w-2xl mx-auto">
            <CustomStepper currentStep={activeStep} />
          </div>
          {/*Passenger details*/}
          <div className="flex items-center gap-2">
            <svg
              enableBackground={"new 0 0 16 16"}
              version="1.1"
              viewBox="0 0 16 16"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="w-7 h-7"
            >
              <g id="Guide" />
              <g id="Layer_2">
                <g>
                  <path
                    d="M8,2C4.69,2,2,4.69,2,8s2.69,6,6,6s6-2.69,6-6S11.31,2,8,2z M8,13c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5 S10.76,13,8,13z"
                    fill="#6C6CFFFF"
                  />
                  <path
                    d="M8,6.85c-0.28,0-0.5,0.22-0.5,0.5v3.4c0,0.28,0.22,0.5,0.5,0.5s0.5-0.22,0.5-0.5v-3.4C8.5,7.08,8.28,6.85,8,6.85z"
                    fill="#6C6CFFFF"
                  />
                  <path
                    d="M8.01,4.8C7.75,4.78,7.51,5.05,7.5,5.32c0,0.01,0,0.07,0,0.08c0,0.27,0.21,0.47,0.49,0.48c0,0,0.01,0,0.01,0 c0.27,0,0.49-0.24,0.5-0.5c0-0.01,0-0.11,0-0.11C8.5,4.98,8.29,4.8,8.01,4.8z"
                    fill="#6C6CFFFF"
                  />
                </g>
              </g>
            </svg>
            <h3 className="text-2xl text-[#6C6CFFFF] font-semibold">
              Passenger details
            </h3>
          </div>
          <p className="text-neutral-500 mb-4">
            Name as on ID card/passport without punctuation
          </p>
          {/*Passport details / info*/}
          <div className="flex flex-col gap-4 mb-10">
            <div className="grid grid-cols-2 gap-5">
              <PassengerInput
                inputType={"text"}
                label={"Name"}
                placeholder={"Input text"}
              />
              <PassengerInput
                label={"Surname"}
                inputType={"text"}
                placeholder={"Input text"}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <PassengerInput
                inputType={"date"}
                placeholder={"Input text"}
                label={"Birthday"}
              />
              <PassengerSelect
                options={[
                  { value: "us", label: "United States" },
                  { value: "ca", label: "Canada" },
                  { value: "uk", label: "United Kingdom" },
                ]}
                placeholder={"Select"}
                label={"Nationality"}
                leftIcon={<GlobeIcon />}
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>
          </div>
          {/*Passport alert info*/}
          <div className="mb-5">
            <PassportAlert />
          </div>
          {/*Passport details*/}
          <div className="flex flex-col gap-4">
            <div>
              <PassengerInput
                inputType={"text"}
                label={"Passport number"}
                placeholder={"Input Text"}
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-10">
              <PassengerSelect
                options={[
                  { value: "us", label: "United States" },
                  { value: "ca", label: "Canada" },
                ]}
                placeholder={"Select Country"}
                label={"Country of Issue"}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <PassengerInput
                inputType={"date"}
                label={"Passport Expiry Date"}
                placeholder={"Select"}
              />
            </div>
            {/*Contact details*/}
            <div className="flex items-center gap-2 mb-6">
              <img className="w-6 h-6" src={contactIcon} />
              <h3 className="text-[#6C6CFFFF] font-semibold text-xl">
                Contact details
              </h3>
            </div>
            <div className="flex flex-col gap-4 mb-10">
              <div className="grid grid-cols-2 gap-5">
                <PassengerInput
                  inputType={"text"}
                  placeholder={"Input text"}
                  label={"Name"}
                />
                <PassengerInput
                  inputType={"text"}
                  label={"Surname"}
                  placeholder={"Input text"}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <PassengerInput
                  inputType={"email"}
                  label={"Email"}
                  placeholder={"Input Email"}
                />
                <PassengerInput
                  inputType={"number"}
                  label={"Phone number"}
                  placeholder={"Input phone number"}
                />
              </div>
            </div>
          </div>
          {/*Next and Back buttons*/}
          <div className="flex items-center justify-between">
            {activeStep > 0 && (
              <button
                className=" h-11 text-lg text-white rounded-[4px]
             bg-[#11D396FF] px-7
             hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF]
             transition-all duration 200"
              >
                Back
              </button>
            )}
            <button
              className={`${activeStep === 0 ? "ml-auto" : ""}
             h-11 text-lg text-white rounded-[4px]
             bg-[#11D396FF] px-7
             hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF]
             transition-all duration 200`}
            >
              Next
            </button>
          </div>
        </div>
        <div className="basis-[30%] flex flex-col gap-5">
          <BookingPriceDetails priceDetails={priceDetails} />
          <BookingFlightContainer
            bookingFlightDetails={bookingFlightDetails}
            departureCity={"Houston"}
            arrivalCity={"Los Angeles"}
          />
        </div>
      </section>
    </section>
  );
};

export default BookingPage;
