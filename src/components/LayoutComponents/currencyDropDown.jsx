import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { currencies } from "../../utils/bookingUtils/currencyUtils";
import { useCurrency } from "../../context/currencyContext";

const CurrencyDropdown = () => {
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const { toCurrency, setToCurrency } = useCurrency();

  const handleCurrencySelect = (currencyCode) => {
    setToCurrency(currencyCode);
    setShowCurrencyMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
        className="flex items-center gap-1 text-[15px] font-bold text-neutral-900 hover:text-[#0A7956FF] transition-colors"
      >
        {toCurrency}
        <ChevronDown
          className={`text-gray-500 transition-transform ${
            showCurrencyMenu ? "rotate-180" : ""
          }`}
          size={16}
        />
      </button>

      {showCurrencyMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 max-h-60 overflow-auto">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => handleCurrencySelect(currency.code)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                toCurrency === currency.code
                  ? "bg-gray-100 text-[#0A7956FF]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {currency.code} - {currency.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;
