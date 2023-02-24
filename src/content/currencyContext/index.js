import { createContext, useState } from "react";

export const CurrencyContext = createContext({
  baseCurrency: "USD",
  secondCurrency: "EUR",
  rate: 1,
});

export const CurrencyContextProvider = ({ children }) => {
  const [currencyPair, setCurrencyPair] = useState({
    baseCurrency: "USD",
    secondCurrency: "EUR",
    rate: 1,
  });

  return (
    <CurrencyContext.Provider value={{ currencyPair, setCurrencyPair }}>
      {children}
    </CurrencyContext.Provider>
  );
};
