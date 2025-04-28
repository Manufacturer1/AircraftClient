import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getExchangeCurrency } from "../services/currencyService";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch exchange rate when currencies change
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (fromCurrency === toCurrency) {
        setExchangeRate(1);
        setConvertedAmount(amount);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await getExchangeCurrency(1, toCurrency);
        setExchangeRate(response.exchangeRate);
        setConvertedAmount(amount * response.exchangeRate);
      } catch (err) {
        setError("Failed to fetch exchange rate");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setConvertedAmount(amount * exchangeRate);
  }, [amount, exchangeRate]);

  // Format currency based on locale
  const formatCurrency = (value, currencyCode) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      amount,
      setAmount,
      fromCurrency,
      setFromCurrency,
      toCurrency,
      setToCurrency,
      exchangeRate,
      convertedAmount,
      isLoading,
      error,
      formatCurrency,
    }),
    [
      amount,
      fromCurrency,
      toCurrency,
      exchangeRate,
      convertedAmount,
      isLoading,
      error,
    ]
  );

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
