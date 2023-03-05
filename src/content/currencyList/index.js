import { useState, useEffect, useContext } from "react";
import { CurrencyContext } from "../currencyContext";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";

const BasedCurrencyName = styled.span`
  font-weight: bold;
`;

export const CurrencyList = ({ context, closeList }) => {
  const {
    currencyFullList,
    setCurrencyFullList,
    currencyPair,
    setCurrencyPair,
  } = useContext(CurrencyContext);

  const { baseCurrency, secondCurrency, rate } = currencyPair;

  const [isLoading, setIsLoading] = useState(true);
  const [currencyFilter, setCurrencyFilter] = useState(null);

  useEffect(() => {
    fetch(`https://api.exchangerate.host/latest?base=${baseCurrency.currency}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencyFullList(Object.entries(data.rates));
        setCurrencyFilter(Object.entries(data.rates));
        setIsLoading(false);
      });
  }, [baseCurrency.currency]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!currencyFullList) {
    return (
      <Typography variant="h6">
        There was an error downloading data. Please try later.
      </Typography>
    );
  }

  const handleCurrencyFilter = (e) => {
    setCurrencyFilter(currencyFullList);
    const filterValue = e.target.value.toUpperCase();

    const filterList = currencyFullList.filter((item) => {
      const [currency, rate] = item;
      return currency.includes(filterValue);
    });

    setCurrencyFilter(filterList);
  };

  const handleCurrencyClick = (currency) => {
    if (context === "baseCurrency") {
      setCurrencyPair({
        ...currencyPair,
        baseCurrency: {
          ...baseCurrency,
          currency,
        },
      });

      setIsLoading(true);
      closeList();
    } else if (context === "secondCurrency") {
      setCurrencyPair({
        ...currencyPair,
        secondCurrency: {
          ...secondCurrency,
          currency: currency,
        },
      });

      closeList();
    }
  };

  return (
    <TableContainer sx={{ minWidth: 300, maxWidth: 420 }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">
              <TextField
                id="findCurrency"
                label="Find currency"
                variant="outlined"
                onChange={handleCurrencyFilter}
              />
            </TableCell>
            <TableCell align="left">
              {/* {context ? "Selected currency: " : "Base currency: "} */} Base
              currency:
              <BasedCurrencyName>
                {/* {context === "secondCurrency"
                  ? secondCurrency.currency
                  : baseCurrency.currency} */}{" "}
                {baseCurrency.currency}
              </BasedCurrencyName>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Currency
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Rate
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyFilter.map((item) => {
            const [currency, rate] = item;
            return (
              <TableRow
                key={currency}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: context ? "pointer" : "inherit",
                }}
                onClick={() => handleCurrencyClick(currency)}
              >
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  {currency}
                </TableCell>
                <TableCell align="right">{rate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
