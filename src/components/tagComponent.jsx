

export default function Tag({title,icon}) {
  return (
      <button className={`${title === "One way" ? 'bg-[#EDFEF8FF] text-[#0A7956FF]' : 'bg-neutral-100 text-neutral-700'} flex items-center gap-2 px-4 py-2 rounded-full `}>
        <img className={`${title === "One way" ? 'block w-5' : ''}`} src={icon} />
        {title}
      </button>
  );
}
