import badgeIcon from "../../../images/badge.svg";

const PassportAlert = () => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <img className="w-8" src={badgeIcon} />
        <h3 className="text-xl text-[#6C6CFFFF] font-semibold">Identity</h3>
      </div>
      <div className="flex flex-col gap-4 bg-[#F0F0FFFF] text-[#6C6CFFFF] font-medium p-4 rounded-md">
        <p>
          Passport valid at least 6 months from departure date is required for
          international travel or transit abroad
        </p>
        <p className="max-w-[800px]">
          Make sure that passenger's name is exactly as written in the
          government issued ID/Passport/Driving License. Avoid any mistake,
          because some airlines dont't allow name corrections after booking.
        </p>
      </div>
    </div>
  );
};

export default PassportAlert;
