import React from "react";
import "./index.css";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "@material-ui/core";

import { TVChartContainer } from "./ChartContainer3";
import Volume from "./volume";
import Liquidity from "./liquidity";

function Chart({ tokenAddress }) {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Volume tokenAddress={tokenAddress} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Liquidity tokenAddress={tokenAddress} />
        </Grid>
      </Grid>
      <TVChartContainer />
    </>
  );
}

export default Chart;
