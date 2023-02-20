import { useState, useEffect } from "react";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const CurrencyList = () => {
  const [currencyList, getCurrencyList] = useState(null);

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <TableContainer sx={{ minWidth: 550, maxWidth: 580 }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>Currency</TableCell>
            <TableCell align="right">Buy</TableCell>
            <TableCell align="right">Sale</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              flag of company
            </TableCell>
            <TableCell align="right">currency</TableCell>
            <TableCell align="right">currency full name</TableCell>
            <TableCell align="right">2.22</TableCell>
            <TableCell align="right">2.24</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
