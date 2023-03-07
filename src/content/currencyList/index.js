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

const BasedCurrencyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-row;
  gap: 10px;
`;
const BasedCurrencyName = styled.div`
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

  const [currencyFullNames, setCurrencyFullNames] = useState(null);

  useEffect(() => {
    fetch("https://openexchangerates.org/api/currencies.json")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Object.entries(data).map(([code, name]) => ({
          currency: code,
          fullName: name,
        }));
        setCurrencyFullNames(formattedData);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.exchangerate.host/latest?base=${baseCurrency.currency}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Object.entries(data.rates);
        if (currencyFullNames) {
          currencyFullNames.forEach(({ currency, fullName }) => {
            formattedData.forEach(([currencyCode, rate], index) => {
              if (currency === currencyCode) {
                formattedData[index].push(fullName);
              }
            });
          });
        }
        setCurrencyFullList(formattedData);
        setCurrencyFilter(formattedData);
        setIsLoading(false);
      });
  }, [baseCurrency.currency, currencyFullNames]);

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
      const [currency, rate, fullName] = item;
      if (currency.includes(filterValue)) {
        return currency.includes(filterValue);
      } else if (fullName.toUpperCase().includes(filterValue)) {
        return fullName.toUpperCase().includes(filterValue);
      }
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
            <TableCell align="right" colSpan={3}>
              <TextField
                id="findCurrency"
                label="Find currency"
                variant="outlined"
                onChange={handleCurrencyFilter}
                sx={{ width: "100%" }}
              />
            </TableCell>
            <TableCell align="left">
              <div>
                <div>Base currency:</div>
              </div>
              <BasedCurrencyContainer>
                <div
                  className={`currency-flag currency-flag-${baseCurrency.currency.toLowerCase()}`}
                ></div>
                <BasedCurrencyName>{baseCurrency.currency}</BasedCurrencyName>
              </BasedCurrencyContainer>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }} colSpan={3}>
              Currency
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Rate
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyFilter.map((item) => {
            const [currency, rate, fullName] = item;
            return (
              <TableRow
                key={currency}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: context ? "pointer" : "inherit",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: context ? "#F2F2F2" : "inherit",
                  },
                }}
                onClick={() => handleCurrencyClick(currency)}
              >
                <TableCell align="left">
                  <div
                    className={`currency-flag currency-flag-${currency.toLowerCase()}`}
                  ></div>
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  {currency}
                </TableCell>
                <TableCell align="left">{fullName}</TableCell>
                <TableCell align="right">{rate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
