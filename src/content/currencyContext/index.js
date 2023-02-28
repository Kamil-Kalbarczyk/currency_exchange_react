import { createContext, useState } from "react";

export const CurrencyContext = createContext({});

// export const SelectCurrency = createContext({
//     currency: 'USD',
//     base: true
// })

export const CurrencyContextProvider = ({ children }) => {
  const [currencyPair, setCurrencyPair] = useState({
    baseCurrency: "USD",
    secondCurrency: "EUR",
    rate: 100,
  });
  const [selectCurrency, setSelectCurrency] = useState(null);

  const [currencyFullList, setCurrencyFullList] = useState(null);

  return (
    <CurrencyContext.Provider
      value={{
        currencyPair,
        setCurrencyPair,
        selectCurrency,
        setSelectCurrency,
        currencyFullList,
        setCurrencyFullList,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
