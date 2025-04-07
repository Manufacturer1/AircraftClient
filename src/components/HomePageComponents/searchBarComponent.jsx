import horizontalArrows from "../../images/horizontalArrows.svg";
import searchIcon from "../../images/searchOutlined.svg";

const SearchBar = ({ originValue, destinationValue, onChange, loading }) => {
  return (
    <div className="flex gap-2">
      <div className="search-bar w-full bg-[#6C6CFFFF] p-10 rounded-[6px]">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <label className="pl-[12px] block text-base font-bold text-neutral-200">
              From
            </label>
            <input
              autoComplete="off"
              name="origin"
              value={originValue}
              onChange={onChange}
              className="search-input"
              type="text"
              placeholder="Where are you?"
            />
            <hr className="ml-[12px]" />
          </div>
          <div>
            <img src={horizontalArrows} />
          </div>
          <div className="space-y-2">
            <label className="pl-[12px] block text-base font-bold text-neutral-200">
              To
            </label>
            <input
              autoComplete="off"
              name="destination"
              value={destinationValue}
              onChange={onChange}
              className="search-input text-neutral-"
              type="text"
              placeholder="Where is your destination?"
            />
            <hr className="ml-[12px] " />
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`bg-[#11D396FF] p-4 flex items-center justify-center rounded-[6px]
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF]"
          }
          transition-all duration-150`}
      >
        {loading ? (
          <span className="inline-block h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <img className="block" src={searchIcon} alt="search flights" />
        )}
      </button>
    </div>
  );
};

export default SearchBar;
