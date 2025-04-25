import PassengerInput from "../components/generalUseComponents/passengerInputField";
import GlobeIcon from "../components/generalUseComponents/globeIconComponent";
import PassengerSelect from "../components/generalUseComponents/passengerSelectComponent";
import PassportAlert from "../components/BookingPageComponents/BookingStepComponents/passportAlertComponent";
import contactIcon from "../images/contact.svg";
import { nationalities, countries } from "../utils/bookingUtils/bookingUtils";
import { validateField } from "../utils/validationUtils/validationUtils";

const BookingStep = ({ formData, setFormData, errors, setErrors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    let formatedValue = value;
    if (name === "phoneNumber") {
      formatedValue = value.slice(0, 9);
    }
    if (name === "passportNumber") {
      formatedValue = value.slice(0, 10);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: formatedValue,
    }));
    const fieldErrors = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      ...fieldErrors,
    }));
  };
  const handleSelectChange = (e) => {
    const { name, value, label } = e.target;
    console.log(label);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const fieldErrors = validateField(name, label);
    setErrors((prev) => ({
      ...prev,
      ...fieldErrors,
    }));
  };
  const handleBlur = (e) => {
    const { name } = e.target;

    const fieldErrors = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      ...fieldErrors,
    }));
  };

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
            name={"name"}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
          />
          <PassengerInput
            label={"Surname"}
            inputType={"text"}
            placeholder={"Input text"}
            name={"surname"}
            value={formData.surname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.surname}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <PassengerInput
            inputType={"date"}
            placeholder={"Input text"}
            label={"Birthday"}
            name={"birthday"}
            value={formData.birthday}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.birthday}
          />
          <PassengerSelect
            options={nationalities}
            placeholder="Select"
            label="Nationality"
            name={"nationality"}
            value={formData.nationality}
            leftIcon={<GlobeIcon />}
            onChange={handleSelectChange}
            error={errors.nationality}
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
            inputType="text"
            label="Passport number"
            placeholder="Input Text"
            name={"passportNumber"}
            value={formData.passportNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.passportNumber}
          />
        </div>
        <div className="grid grid-cols-2 gap-5 mb-10">
          <PassengerSelect
            options={countries}
            placeholder={"Select Country"}
            label={"Country of Issue"}
            name={"country"}
            value={formData.country}
            onChange={handleSelectChange}
            error={errors.country}
          />
          <PassengerInput
            inputType={"date"}
            label={"Passport Expiry Date"}
            placeholder={"Select"}
            name={"passportExpiryDate"}
            value={formData.passportExpiryDate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.passportExpiryDate}
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
              name={"contactName"}
              value={formData.contactName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.contactName}
            />
            <PassengerInput
              inputType={"text"}
              label={"Surname"}
              placeholder={"Input text"}
              name={"contactSurname"}
              value={formData.contactSurname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.contactSurname}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <PassengerInput
              inputType={"email"}
              label={"Email"}
              placeholder={"Input Email"}
              name={"email"}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
            />
            <PassengerInput
              inputType={"number"}
              label={"Phone number"}
              placeholder={"Input phone number"}
              name={"phoneNumber"}
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phoneNumber}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingStep;
