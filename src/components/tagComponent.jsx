export default function Tag({ title, icon }) {
  return (
    <button
      className={`${
        title === "One way"
          ? "bg-[#EDFEF8FF] text-[#0A7956FF] hover:bg-[#56F1C0FF] \
          hover:active:bg-[#11D396FF] transition-all duration-150"
          : "bg-neutral-100 text-neutral-700 hover:bg-[#CFD2DAFF] hover:active:bg-[#A7ADB7FF] \
          transition-all duration-150"
      } flex items-center gap-2 px-4 py-2 rounded-full`}
    >
      <img className={`${title === "One way" ? "block w-5" : ""}`} src={icon} />
      {title}
    </button>
  );
}
