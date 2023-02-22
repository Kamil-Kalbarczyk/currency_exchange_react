import { useState, useEffect } from "react";

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

export const CurrencyList = () => {
  const [currencyList, getCurrencyList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest?base=USD")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getCurrencyList(Object.entries(data.rates));
        setIsLoading(false);
        console.log(currencyList);
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

  return (
    <TableContainer sx={{ minWidth: 300, maxWidth: 320 }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Rate</TableCell>
            <TableCell align="left">Base currency: {"USD"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Currency</TableCell>
            <TableCell align="right">Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyList.map((currency) => {
            return (
              <TableRow
                key={currency[0]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{currency[0]}</TableCell>
                <TableCell align="right">{currency[1]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
