import { createContext, useState } from "react";

export const CurrencyContext = createContext({});

export const CurrencyContextProvider = ({ children }) => {
  const [currencyPair, setCurrencyPair] = useState({
    baseCurrency: { currency: "USD", value: 100 },
    secondCurrency: { currency: "EUR", value: 100 },
    rate: 1,
  });

  const [currencyFullList, setCurrencyFullList] = useState(null);

  return (
    <CurrencyContext.Provider
      value={{
        currencyPair,
        setCurrencyPair,
        currencyFullList,
        setCurrencyFullList,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
