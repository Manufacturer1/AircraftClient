import creditCardIcon from "../images/creditCard.svg";
import visaCardIcon from "../images/visaCard.svg";
import masterCardIcon from "../images/masterCard.svg";
import amexCardIcon from "../images/amexCard.svg";
import PassengerInput from "../components/generalUseComponents/passengerInputField";
import InfoIcon from "../components/generalUseComponents/infoIconComponent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const PurchaseStep = () => {
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
          />
          <PassengerInput
            inputType={"number"}
            label={"Card number"}
            placeholder={"Enter card number"}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <PassengerInput
            inputType={"number"}
            label={"Expiration date"}
            placeholder={"MM/YY"}
          />
          <PassengerInput
            inputType={"number"}
            label={"CVV"}
            placeholder={"Enter CVV"}
            rightIcon={<InfoIcon />}
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
