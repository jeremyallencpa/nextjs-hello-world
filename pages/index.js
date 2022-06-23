import CoinsTable from "../components/CoinsTable";
import Layout from "../components/Layout";
import AggregateTvl from "../components/AggregateTVLChart";
import BalanceChart from "../components/BalanceChart";
import SelectButton from "../components/SelectButton";
import { chartDays } from "../config/data";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { CounterProvider } from "../components/Counter";
import { useCount, useDispatchCount } from "../components/Counter";
import { Box, Container, Grid, Paper } from "@material-ui/core";
import MonthlyDetail from "../components/MonthlyDetail";
import Copyright from "../components/Copyright";

export default function Home({ tokens, chartData, revData, volData }) {
  const count = useCount();
  const dispatch = useDispatchCount();

  const handle1 = (event) =>
    dispatch({
      type: "1",
    });
  const handle30 = (event) =>
    dispatch({
      type: "30",
    });

  const handle90 = (event) =>
    dispatch({
      type: "90",
    });

  const handle365 = (event) =>
    dispatch({
      type: "365",
    });

  const handleYTD = (event) =>
    dispatch({
      type: "YTD",
    });

  const handleITD = (event) =>
    dispatch({
      type: "ITD",
    });

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          color: "black",
          marginTop: 25,
          justifyContent: "space-around",
          width: "100%",
        }}
      ></div>
      {/* <div> */}
        {/* <p>Days: {count}</p>
        <button onClick={handle1}>1D</button>
        <button onClick={handle30}>30D</button>
        <button onClick={handle90}>90D</button>
        <button onClick={handle365}>1Y</button>
        <button onClick={handleITD}>ITD</button>
        <button onClick={handleYTD}>YTD</button> */}
      {/* </div> */}
      <>
        {/* <Banner></Banner> */}
        <div
          style={{
            display: "flex",
            color: "black",
            marginTop: 25,
            justifyContent: "space-around",
            width: "100%",
          }}
        ></div>
        <Box>
          <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
            <Grid sx={{ gap: 2 }} container spacing={3}>
              {/* Aggregate TVL Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 5,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                  style={{
                    padding: 12,
                    backgroundColor: "black",
                    border: "2px solid white",
                  }}
                >
                  <AggregateTvl chartData={chartData} />
                </Paper>
              </Grid>
              {/* Recent Activity */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 5,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                  style={{
                    padding: 12,
                    backgroundColor: "black",
                    border: "2px solid white",
                  }}
                >
                  <MonthlyDetail revData={revData} volData={volData}/>
                </Paper>
              </Grid>
              {/* TVL Table */}
              <Grid item xs={12}>
                <Paper
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  style={{
                    padding: 12,
                    backgroundColor: "black",
                    border: "2px solid white",
                  }}
                >
                  <CoinsTable tokens={tokens} />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  // Get TVL data
  const tvls = await fetch("https://wrapped-metrics-api.onrender.com/tvl");
  const tokens = await tvls.json();
  // Get historical chart data
  const days = "ITD";
  const historicaltvls = await fetch(
    `https://wrapped-metrics-api.onrender.com/historicaltvls/${days}`
  );
  const chartData = await historicaltvls.json();
  // Get monthly data
  const rev = await fetch (`https://wrapped-metrics-api.onrender.com/revenue`)
  const revData = await rev.json()
  const vol = await fetch (`https://wrapped-metrics-api.onrender.com/volume`)
  const volData = await vol.json()
  

  return {
    props: {
      tokens,
      chartData,
      revData,
      volData
    },
  };
};
