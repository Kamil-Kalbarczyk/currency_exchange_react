import { useState, useContext } from "react";
import { CurrencyContext } from "../currencyContext";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

export const CurrencyComparison = () => {
  // console.log(useContext(CurrencyContext).currencyPair);

  const [currencyPair, setcurrencyPair] = useState({
    firstCurrency: { name: "USD", value: 100 },
    secondCurrency: { name: "EUR", value: 100 },
  });

  const { firstCurrency, secondCurrency } = currencyPair;

  const handleClickFirstComparisonCurrency = (e) => {
    console.log("first currency", e);
  };

  const handleClickSecondComparisonCurrency = (e) => {
    console.log("second currency", e);
  };

  const handleChangeValue = (e) => {
    console.log(e.target.name);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
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
                  {firstCurrency.name}
                </Button>
              </InputAdornment>
            }
            name="firstCurrency"
            value={firstCurrency.value}
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
                  {secondCurrency.name}
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
