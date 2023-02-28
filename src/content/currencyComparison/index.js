import { useState, useContext } from "react";
import { CurrencyContext } from "../currencyContext";
import styled, { keyframes } from "styled-components";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

export const CurrencyComparison = () => {
  const { currencyPair, setCurrencyPair, selectCurrency, setSelectCurrency } =
    useContext(CurrencyContext);

  const { baseCurrency, secondCurrency, rate } = currencyPair;

  const handleClickFirstComparisonCurrency = (e) => {
    console.log("first currency", e);
    setSelectCurrency({ base: true });
    console.log(selectCurrency);
  };

  const handleClickSecondComparisonCurrency = (e) => {
    console.log("second currency", e);
    setSelectCurrency({ base: false });
    console.log(selectCurrency);
  };

  const handleChangeValue = (e) => {
    console.log(e.target.name);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        transition: "0.3s",
        // transform: selectCurrency ? "scale(0)" : "scale(1)",
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
