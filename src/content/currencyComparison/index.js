import { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

export const CurrencyComparison = () => {
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
            value={firstCurrency.value}
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
            value={secondCurrency.value}
          />
        </FormControl>
      </div>
    </Box>
  );
};
