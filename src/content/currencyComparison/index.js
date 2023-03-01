import { useState, useContext, useEffect } from "react";
import { CurrencyContext } from "../currencyContext";
import styled, { keyframes } from "styled-components";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

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
      // console.log(currencyPair);
    }
  }, [currencyFullList, baseCurrency.currency, secondCurrency.currency]);

  const handleClickFirstComparisonCurrency = (e) => {
    console.log("first currency", e);
  };

  const handleClickSecondComparisonCurrency = (e) => {
    console.log("second currency", e);
  };

  const handleChangeValue = (e) => {
    if (e.target.name === "firstCurrency") {
      const firstCurrencyValue = e.target.value;
      const secondCurrencyValue =
        Math.round(firstCurrencyValue * rate * 100) / 100;
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
    }
  };

  return (
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
          {/* <InputLabel htmlFor="firstComparisonCurrency">{firstCurrency.name}</InputLabel> */}
          <Input
            id="firstComparisonCurrency"
            endAdornment={
              <InputAdornment position="end">
                <Button
                  sx={{ fontWeight: "bold" }}
                  variant="text"
                  onClick={handleClickFirstComparisonCurrency}
                >
                  {baseCurrency.currency}
                </Button>
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
          {/* <InputLabel htmlFor="handleClickSecondComparisonCurrency">{secondCurrency.name}</InputLabel> */}
          <Input
            id="handleClickSecondComparisonCurrency"
            endAdornment={
              <InputAdornment position="end">
                <Button
                  sx={{ fontWeight: "bold" }}
                  variant="text"
                  onClick={handleClickSecondComparisonCurrency}
                >
                  {secondCurrency.currency}
                </Button>
              </InputAdornment>
            }
            name="secondCurrency"
            value={secondCurrency.value}
            onChange={handleChangeValue}
          />
        </FormControl>
      </div>
    </Box>
  );
};
