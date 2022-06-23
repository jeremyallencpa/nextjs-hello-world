import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  createTheme,
  TableCell,
  CircularProgress,
  LinearProgress,
  ThemeProvider,
  Typography,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";

import Link from "next/dist/client/link";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function titleCase(str) {
  return str.replace(/\w\S/g, function (t) {
    return t.toUpperCase();
  });
}

export default function CoinsTable({ tokens }) {
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState("$");
  const [page] = useState(1);

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
      align: "right",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "white",
      },
    },
  });

  const getTotal = () => {
    return tokens.reduce((acc, coin) => acc + coin.tvl, 0);
  };

  const classes = useStyles();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          style={{ margin: 10, fontFamily: "Montserrat", fontWeight: "500" }}
        >
          Assets
        </Typography>
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress
              style={{ color: "white" }}
              size={250}
              thickness={1}
            />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "white" }}>
                <TableRow>
                  {["Asset", "Price", "Supply", "TVL"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Asset" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {tokens
                  .slice((page - 1) * 20, (page - 1) * 20 + 20)
                  .map((row) => {
                    return (
                      <Link href="/coin/[id]" as={`/coin/${row.coin}`}>
                        <TableRow
                          // onClick={() => history.push(`/coins/${row.coin}`)}
                          className={classes.row}
                          key={row.name}
                        >
                          <TableCell
                            // component="th"
                            // scope="row"
                            style={{
                              display: "flex",
                              gap: 15,
                              align: "right",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                align: "right",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 18,
                                  align: "right",
                                }}
                              >
                                {row.name}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.coin}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {symbol}
                            {""}
                            {numberWithCommas(row.price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: "white",
                              fontWeight: 500,
                            }}
                          >
                            {numberWithCommas(row.supply.toFixed(2))}
                          </TableCell>
                          <TableCell align="right">
                            {symbol}
                            {""}
                            {numberWithCommas(row.tvl.toFixed(2))}
                          </TableCell>
                        </TableRow>
                      </Link>
                    );
                  })}
                <TableRow style={{ backgroundColor: "white" }}>
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    align="right"
                    colSpan={3}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    align="right"
                  >
                    {symbol}
                    {""}
                    {numberWithCommas(getTotal().toFixed(2))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>

      <div
        style={{
          display: "flex",
          color: "black",
          marginTop: 30,
          justifyContent: "space-around",
          width: "100%",
        }}
      ></div>
    </ThemeProvider>
  );
}
