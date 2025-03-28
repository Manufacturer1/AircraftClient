import PassengerInput from "../components/passengerInputField";
import GlobeIcon from "../components/globeIconComponent";
import PassengerSelect from "../components/passengerSelectComponent";
import PassportAlert from "../components/passportAlertComponent";
import contactIcon from "../images/contact.svg";

const BookingStep = ({ nationality, setNationality, country, setCountry }) => {
  return (
    <section>
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
        <div className="flex items-center gap-2 mb-2">
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
    </section>
  );
};

export default BookingStep;
