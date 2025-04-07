export default function Tag({ title, icon, isActive = false, onClick }) {
  // Determine styling based on both title and active state
  const getButtonStyles = () => {
    if (isActive) {
      return "bg-[#56F1C0FF] text-[#0A7956FF] hover:bg-[#56F1C0FF] hover:active:bg-[#11D396FF]";
    }
    return "bg-neutral-100 text-neutral-700 hover:bg-[#CFD2DAFF] hover:active:bg-[#A7ADB7FF]";
  };

  return (
    <button
      type="button"
      className={`${getButtonStyles()} flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-150`}
      onClick={onClick}
    >
      <img className={`w-5`} src={icon} alt={`${title} icon`} />
      {title}
    </button>
  );
}
