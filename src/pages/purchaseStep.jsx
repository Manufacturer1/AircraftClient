import creditCardIcon from "../images/creditCard.svg";
import visaCardIcon from "../images/visaCard.svg";
import masterCardIcon from "../images/masterCard.svg";
import amexCardIcon from "../images/amexCard.svg";
import PassengerInput from "../components/generalUseComponents/passengerInputField";
import InfoIcon from "../components/generalUseComponents/infoIconComponent";
import { validateField } from "../utils/validationUtils/validationUtils";

const PurchaseStep = ({ formData, setFormData, errors, setErrors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;
    if (name === "cardNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      const limitedDigits = digitsOnly.slice(0, 16);
      updatedValue = limitedDigits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    } else if (name === "expirationDate") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 4);
      if (digitsOnly.length >= 3) {
        updatedValue = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
      } else {
        updatedValue = digitsOnly;
      }
    } else if (name === "cardCvv") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 3);
      updatedValue = digitsOnly;
    } else if (name === "cardName") {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "").slice(0, 100);
      updatedValue = lettersOnly;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    const fieldErrors = validateField(name, value);
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
      <div className="flex gap-2 items-center mb-7">
        <img className="w-8 h-8" src={creditCardIcon} />
        <h2 className="text-[#6C6CFFFF] font-semibold text-xl">
          Payment process
        </h2>
      </div>
      <div
        className="flex items-center justify-center mx-auto w-[430px] h-[80px] bg-[#EDFEF8FF] 
      rounded-[4px] border-2 border-solid
       border-[#11D396FF] mb-10"
      >
        <div className="flex items-center justify-center gap-3">
          <img className="w-16 h-16" src={visaCardIcon} />
          <img className="w-16 h-16" src={masterCardIcon} />
          <img className="w-16 h-16" src={amexCardIcon} />
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="grid grid-cols-2 gap-5">
          <PassengerInput
            inputType={"text"}
            label={"Name on card"}
            placeholder={"Enter name on card"}
            name={"cardName"}
            value={formData.cardName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.cardName}
          />
          <PassengerInput
            inputType={"text"}
            label={"Card number"}
            placeholder={"Enter card number"}
            name={"cardNumber"}
            value={formData.cardNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.cardNumber}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <PassengerInput
            inputType={"text"}
            label={"Expiration date"}
            placeholder={"MM/YY"}
            name={"expirationDate"}
            value={formData.expirationDate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.expirationDate}
          />
          <PassengerInput
            inputType={"number"}
            label={"CVV"}
            placeholder={"Enter CVV"}
            rightIcon={<InfoIcon />}
            name={"cardCvv"}
            value={formData.cardCvv}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.cardCvv}
          />
        </div>
      </div>
      <p className="text-[#171A1FFF] text-sm mb-14">
        By selecting the next button, I agree to the{" "}
        <span className="font-semibold">
          Property Rules, Terms and Conditions
        </span>
        , and <span className="font-semibold">Privacy Policy</span>
      </p>
    </section>
  );
};

export default PurchaseStep;
