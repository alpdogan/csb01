import React from "react";
import Chart from "kaktana-react-lightweight-charts";
import { useQuery, gql } from "@apollo/client";

const Volume = function ({ tokenAddress }) {
  let chartData = [];
  const options = {
    localization: {
      priceFormatter: function (price) {
        return "$" + price.toFixed(2);
      }
    },
    layout: {
      backgroundColor: "#131722",
      textColor: "#d1d4dc"
    },
    grid: {
      vertLines: {
        color: "rgba(42, 46, 57, 0)"
      },
      horzLines: {
        color: "rgba(42, 46, 57, 0.6)"
      }
    },
    topColor: "rgba(38,198,218, 0.56)",
    bottomColor: "rgba(38,198,218, 0.04)",
    lineColor: "rgba(38,198,218, 1)",
    lineWidth: 2,
    lineStyle: 0,
    crosshairMarkerVisible: false,
    crosshairMarkerRadius: 3,
    crosshairMarkerBorderColor: "rgb(255, 255, 255, 1)",
    crosshairMarkerBackgroundColor: "rgb(34, 150, 243, 1)"
  };
  const { loading, error, data } = useQuery(
    gql`
      query($baseCurrency: String) {
        ethereum(network: bsc) {
          dexTrades(
            date: { since: "2019-01-01" }
            exchangeName: { is: "Pancake" }
            baseCurrency: { is: $baseCurrency }
          ) {
            count
            tradeAmount(in: USD)
            date {
              date
            }
          }
        }
      }
    `,
    {
      variables: {
        baseCurrency:
          tokenAddress || "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"
      },
      pollInterval: 1000
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  chartData = data.ethereum.dexTrades.map((el) => ({
    time: el.date.date,
    value: el.tradeAmount
  }));

  if (chartData.length > 0) {
    console.log("CHART344", chartData);

    return (
      <Chart
        legend="Liquidity"
        autoWidth
        options={options}
        areaSeries={[
          {
            data: chartData
          }
        ]}
        height={320}
      />
    );
  }
};

export default Volume;
