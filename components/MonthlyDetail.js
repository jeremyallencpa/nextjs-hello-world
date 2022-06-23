// import axios from "axios";
import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import { RevenueData } from "../config/api";
// import { VolumeData } from "../config/api";
import { numberWithCommas } from "./CoinsTable";
import { makeStyles } from "@material-ui/core";


function preventDefault(event) {
  event.preventDefault();
}

export default function MonthlyDetail({revData, volData}) {
  const [revenue, setRevenue] = useState([]);
  const [volume, setVolume] = useState([]);
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState("$");

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

//   const fetchRevenue = async () => {
//     setLoading(true);
//     const { data } = await axios.get(RevenueData());
//     console.log(data);
//     console.log(data.length);
//     setRevenue(data.toFixed(2));
//     setLoading(false);
//   };

//   const fetchVolume = async () => {
//     setLoading(true);
//     const { data } = await axios.get(VolumeData());
//     console.log(data);
//     console.log(data.length);
//     setVolume(data.toFixed(2));
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchRevenue();
//     fetchVolume();
//   }, []);

  return (
    <React.Fragment>
      <Typography className={classes.change}>
        Monthly Revenue: {symbol}
        {numberWithCommas(revData.toFixed(2))}
      </Typography>
      <Typography className={classes.change}>
        Monthly Volume: {symbol}
        {numberWithCommas(volData.toFixed(2))}
      </Typography>
    </React.Fragment>
  );
}
