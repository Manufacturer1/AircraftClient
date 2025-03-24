import envellopeIcon from "../images/envellope.svg";

const SubscribeField = () => {
  return (
    <div className="flex gap-3 relative">
      <input
        type="email"
        placeholder="Input your email"
        className="h-9 pl-8 pr-3 font-normal 
            rounded-[18px] border-2 border-neutral-400 text-sm
            border-solid bg-white outline-none
            hover:text-neutral-400 hover:bg-white hover:border-neutral-500 
            transition-all duration-150
            focus:text-neutral-400 focus:bg-white focus:border-[#9095A0]"
      />

      <button
        className="px-3 h-9 text-sm font-normal text-white
       bg-[#11D396FF] rounded-[18px]
        hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF] transition-all duration-150"
      >
        Subscribe
      </button>
      <img src={envellopeIcon} className="absolute top-[11px] left-[12px]" />
    </div>
  );
};

export default SubscribeField;
