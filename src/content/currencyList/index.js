import { useState, useEffect } from "react";
import styled from "styled-components";

import * as React from "react";
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

const BasedCurrency = styled.span`
  font-weight: bold;
`;

export const CurrencyList = () => {
  const [currencyList, setCurrencyList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currencyFilter, setCurrencyFilter] = useState(null);

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest?base=USD")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCurrencyList(Object.entries(data.rates));
        setCurrencyFilter(Object.entries(data.rates));
        setIsLoading(false);
        // console.log(currencyList);
      });
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!currencyList) {
    return (
      <Typography variant="h6">
        There was an error downloading data. Please try later.
      </Typography>
    );
  }

  if (currencyList) {
    const filterList = currencyList.filter((item) => {
      const [currency, rate] = item;
      return currency.includes("SD");
    });

    // console.log(filterList);
  }

  const handleCurrencyFilter = (e) => {
    setCurrencyFilter(currencyList);
    const filterValue = e.target.value.toUpperCase();

    const filterList = currencyList.filter((item) => {
      const [currency, rate] = item;
      return currency.includes(filterValue);
    });

    setCurrencyFilter(filterList);

    // setCurrencyList(filterList);
  };

  return (
    <TableContainer sx={{ minWidth: 300, maxWidth: 320 }} component={Paper}>
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
              Base currency: <BasedCurrency>{"USD"}</BasedCurrency>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Currency</TableCell>
            <TableCell align="right">Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyFilter.map((item) => {
            const [currency, rate] = item;
            return (
              <TableRow
                key={currency}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{currency}</TableCell>
                <TableCell align="right">{rate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
