import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import connectWeb3 from "./connectWeb3";

import Topbar from "./components/Topbar";
import Swap from "./components/swap";
import Chart from "./components/chart";

const client = new ApolloClient({
  uri: "https://graphql.bitquery.io",
  cache: new InMemoryCache()
});

export default function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [chartAddress, setChartAddress] = useState(null);

  async function connectWallet() {
    const { web3, accounts } = await connectWeb3();
    setWeb3(web3);
    setAccount(accounts[0]);
  }

  async function getUserBalance() {}

  console.log(web3, account);
  return (
    <ApolloProvider client={client}>
      <div>
        <Topbar connectWallet={connectWallet} account={account} />
        <Swap web3={web3} account={account} />
        <TextField
          fullWidth
          placeholder="Enter token address to view chart"
          variant="outlined"
          value={chartAddress}
          onChange={(e) => setChartAddress(e.target.value)}
        />
        <Chart tokenAddress={chartAddress} />
      </div>
    </ApolloProvider>
  );
}
