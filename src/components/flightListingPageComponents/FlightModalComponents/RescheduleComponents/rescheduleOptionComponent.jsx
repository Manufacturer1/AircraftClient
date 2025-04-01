import { useState } from "react";
import PolicyContainer from "../../../generalUseComponents/policyContainerComponent";
import RescheduleDetails from "./rescheduleDetailsComponent";

const RescheduleOption = ({ rescheduleInfo }) => {
  const [selected, setSelected] = useState(0);

  const rescheduleOptions = [
    "Regular policy",
    "Validity date",
    "Fee",
    "Process",
  ];

  return (
    <div className="flex">
      <div className="basis-[30%] bg-white">
        <PolicyContainer
          options={rescheduleOptions}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <div className="basis-[70%] bg-[#F8F9FAFF] px-4 pt-3 flex flex-col gap-9">
        <RescheduleDetails rescheduleInfo={rescheduleInfo[0]} />
        <RescheduleDetails rescheduleInfo={rescheduleInfo[1]} />
      </div>
    </div>
  );
};

export default RescheduleOption;
