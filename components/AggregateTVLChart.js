import React, { useEffect, useState } from "react";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
import { ResponsiveContainer } from "recharts";
import { Line } from "react-chartjs-2";
import { numberWithCommas } from "./CoinsTable";
import { Typography, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";


export default function AggregateTvl({chartData, changeData}) {
  const [aggregateTvl, setAggregateTvl] = useState([]);
  const [days, setDays] = useState("ITD");
  const [aggregateTvlChange, setAggregateTvlChange] = useState([]);
  const [symbol, setSymbol] = useState("$")
  const [chart, setChart] = useState("TVL")

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "light",
    },
  });

  const useStyles = makeStyles({
    change: {
      padding: 5,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      width: "100%",
      margin: 6,
      fontWeight: 800
    },
  });

  const classes = useStyles();

  const fetchAggregateTvl = async () => {
    const { data } = await fetch(`https://wrapped-metrics-api.onrender.com/historicaltvls/${days}`);
    setAggregateTvl(data);
  };

  const fetchAggregateTvlChange = async () => {
    const { data } = await fetch(`https://wrapped-metrics-api.onrender.com/historicaltvls/change/${days}`);
    setAggregateTvlChange(data);
  };

  useEffect(() => {
    fetchAggregateTvl();
    fetchAggregateTvlChange();
  }, [days, chart]);

  return (
    <ThemeProvider theme={darkTheme}>
      {/* <React.Fragment> */}
        {/* <Typography className={classes.change}>
          Change: {symbol}
          {numberWithCommas(
            aggregateTvlChange.map((item) => item.change.toFixed(2))
          )}
        </Typography>
        <Typography className={classes.change}>
          % Change:{" "}
          {numberWithCommas(aggregateTvlChange.map((item) => item.percent_change.toFixed(2)))}%
        </Typography> */}
        <ResponsiveContainer>
          <Line
            data={{
              labels: chartData.map((coin) => {
                let date = coin.date;
                return date;
              }),

              datasets: [
                {
                  data: chartData.map((coin) => coin.aggregateTvl),
                  label: `TVL`,
                  borderColor: "white",
                  padding: "40",
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  position: "top",
                  padding: "40"
                },
              },
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </ResponsiveContainer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            justifyContent: "space-around",
            width: "80%",
            marginRight: "10%",
            marginLeft: "10%",
          }}
        >
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => {
                setDays(day.value);
              }}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
            marginRight: "0%",
            marginLeft: "10%",
          }}
        ></div>
      {/* </React.Fragment> */}
    </ThemeProvider>
  );
}
