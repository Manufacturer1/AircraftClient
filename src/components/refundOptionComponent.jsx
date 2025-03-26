import PolicyContainer from "./policyContainerComponent";
import { React, useState } from "react";
import RefundDetails from "./refundDetailsComponent";

const options = [
  "Your refund policy",
  "Refund estimation",
  "Refund process",
  "Other refund info",
];

const RefundOption = ({ refundInfo }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex">
      <div className="basis-[30%] bg-white ">
        <PolicyContainer
          options={options}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <div className="basis-[70%] px-4 pt-3 bg-neutral-50 flex flex-col gap-9">
        <RefundDetails refundInfo={refundInfo[0]} />
        <RefundDetails refundInfo={refundInfo[1]} />
      </div>
    </div>
  );
};

export default RefundOption;
