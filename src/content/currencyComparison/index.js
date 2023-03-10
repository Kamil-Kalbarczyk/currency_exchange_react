import { CurrencyChangeButton } from "./currencyChangeList";
import { useState, useContext, useEffect } from "react";
import { CurrencyContext } from "../currencyContext";
import styled, { keyframes } from "styled-components";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Fab from "@mui/material/Fab";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

export const CurrencyComparison = () => {
  const { currencyPair, setCurrencyPair, currencyFullList } =
    useContext(CurrencyContext);

  const { baseCurrency, secondCurrency, rate } = currencyPair;

  // set rate currency
  useEffect(() => {
    if (baseCurrency && secondCurrency && currencyFullList) {
      const rateOfSecondCurrency = currencyFullList.find(([currency, rate]) => {
        return currency === secondCurrency.currency;
      })[1];
      const secondCurrencyValue =
        Math.round(baseCurrency.value * rateOfSecondCurrency * 100) / 100;
      setCurrencyPair({
        ...currencyPair,
        secondCurrency: {
          ...secondCurrency,
          value: secondCurrencyValue,
        },
        rate: rateOfSecondCurrency,
      });
    }
  }, [currencyFullList, baseCurrency.currency, secondCurrency.currency]);

  const handleClickFirstComparisonCurrency = (e) => {
    console.log("first currency", e);
  };

  const handleClickSecondComparisonCurrency = (e) => {
    console.log("second currency", e);
  };

  const handleChangeValue = (e) => {
    let firstCurrencyValue = null;
    let secondCurrencyValue = null;
    if (e.target.name === "firstCurrency") {
      firstCurrencyValue = e.target.value;
      secondCurrencyValue = Math.round(firstCurrencyValue * rate * 100) / 100;
    } else if (e.target.name === "secondCurrency") {
      secondCurrencyValue = e.target.value;
      firstCurrencyValue = Math.round((secondCurrencyValue / rate) * 100) / 100;
    }

    setCurrencyPair({
      ...currencyPair,
      baseCurrency: {
        ...baseCurrency,
        value: firstCurrencyValue,
      },
      secondCurrency: {
        ...secondCurrency,
        value: secondCurrencyValue,
      },
    });
  };

  const handleCurrencyReplace = () => {
    setCurrencyPair({
      ...currencyPair,
      baseCurrency: secondCurrency,
      secondCurrency: baseCurrency,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        // flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        // transition: "0.3s",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          transition: "0.3s",
        }}
      >
        <div>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <Input
              id="firstComparisonCurrency"
              endAdornment={
                <InputAdornment position="end">
                  <div
                    className={`currency-flag currency-flag-${baseCurrency.currency.toLowerCase()}`}
                  ></div>
                  <CurrencyChangeButton
                    buttonName={baseCurrency.currency}
                    context="baseCurrency"
                  />
                </InputAdornment>
              }
              name="firstCurrency"
              value={baseCurrency.value}
              onChange={handleChangeValue}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <Input
              id="handleClickSecondComparisonCurrency"
              endAdornment={
                <InputAdornment position="end">
                  <div
                    className={`currency-flag currency-flag-${secondCurrency.currency.toLowerCase()}`}
                  ></div>
                  <CurrencyChangeButton
                    buttonName={secondCurrency.currency}
                    context="secondCurrency"
                  />
                </InputAdornment>
              }
              name="secondCurrency"
              value={secondCurrency.value}
              onChange={handleChangeValue}
            />
          </FormControl>
        </div>
      </Box>
      <Fab color="primary" onClick={handleCurrencyReplace}>
        <CurrencyExchangeIcon />
      </Fab>
    </Box>
  );
};
