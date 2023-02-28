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

export const CurrencyList = () => {
  // const [currencyList, setCurrencyList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currencyFilter, setCurrencyFilter] = useState(null);

  const { currencyFullList, setCurrencyFullList } = useContext(CurrencyContext);

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest?base=USD")
      .then((response) => response.json())
      .then((data) => {
        // setCurrencyList(Object.entries(data.rates));
        setCurrencyFullList(Object.entries(data.rates));
        setCurrencyFilter(Object.entries(data.rates));
        setIsLoading(false);
      });
  }, []);

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
              Base currency: <BasedCurrencyName>{"USD"}</BasedCurrencyName>
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
