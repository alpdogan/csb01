import React, { useState } from "react";
import { Button, Tabs, Tab, Box, Typography, Paper } from "@material-ui/core";

import Field from "./Field";
import WbtcField from "./WbtcField";
import swapEth from "../../swap/swapEth";
import swapToken from "../../swap/swapToken";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function Swap({ web3, account }) {
  const [tab, setTab] = useState(0);
  const [balance, setBalance] = useState("0.0");
  const [amount, setAmount] = useState(null);
  // const [percentage, setPercentage] = useState(null);
  const [token, setToken] = useState({
    address: "0x0000000000000000000000000000000000000000",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    image: "/images/eth.png",
    balance: 8415.474337527885,
    price: {
      rate: 2667.7102569090216,
      diff: -9.92,
      diff7d: -31.04,
      ts: 1621500482,
      marketCapUsd: 309317624630.50165,
      availableSupply: 115948733.124,
      volume24h: 92673451339.42307,
      diff30d: 18.7720811043894,
      volDiff1: 67.73867283372849,
      volDiff7: 21.38564545582709,
      volDiff30: 74.02262104689953
    },
    countOps: 0
  });

  function handleSwap() {
    swapEth(web3, account, "DAI", web3.utils.toWei(amount.toString(), "ether"));
  }

  function handleSell() {
    const WBTC = {
      address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      name: "Wrapped Bitcoin",
      decimals: "8",
      symbol: "WBTC",
      totalSupply: "18166342419722",
      owner: "0xca06411bd7a7296d7dbdd0050dfc846e95febeb7",
      transfersCount: 1819816,
      lastUpdated: 1621760707,
      issuancesCount: 35,
      holdersCount: 30230,
      description:
        "WBTC is an ERC20 token that is backed 1:1 by bitcoin. The idea behind the token is to bring the vast liquidity of the Bitcoin network to Ethereum, and a crypto projects is working together to make that possible.",
      website: "https://www.wbtc.network/",
      image: "/images/wbtc.png",
      coingecko: "wrapped-bitcoin",
      ethTransfersCount: 0,
      price: {
        rate: 34735.92427389834,
        diff: -6.02,
        diff7d: -29.3,
        ts: 1621760766,
        marketCapUsd: 6313716718.062279,
        availableSupply: 181763.31420686,
        volume24h: 252100527.83068797,
        diff30d: -30.572932443067558,
        volDiff1: -29.38103579836074,
        volDiff7: 39.030811782840544,
        volDiff30: 84.95676427122154,
        currency: "USD"
      },
      publicTags: ["Asset-backed", "DeFi", "Tokenized", "BTC"],
      countOps: 1819816
    };
    swapToken(
      web3,
      account,
      WBTC,
      token,
      web3.utils.toWei(amount.toString(), "ether")
    );
  }

  function handleBuy() {}

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div>
      <Paper square style={{ flexGrow: 1, maxWidth: "500" }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="Buy" {...a11yProps(0)} />
          <Tab label="Sell" {...a11yProps(1)} />
        </Tabs>
      </Paper>
      <TabPanel value={tab} index={0}>
        <>
          From
          <Field
            account={account}
            token={token}
            setToken={setToken}
            balance={balance}
            setBalance={setBalance}
            amount={amount}
            setAmount={setAmount}
          />
          To
          <WbtcField />
          <Button
            disabled={!web3}
            onClick={() => handleBuy()}
            variant="contained"
            fullWidth
            color="primary"
          >
            Buy
          </Button>
        </>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <>
          From
          <WbtcField />
          To
          <Field
            account={account}
            token={token}
            setToken={setToken}
            balance={balance}
            setBalance={setBalance}
            amount={amount}
            setAmount={setAmount}
          />
          <Button
            disabled={!web3}
            onClick={() => handleSell()}
            variant="contained"
            fullWidth
            color="secondary"
          >
            Sell
          </Button>
        </>
      </TabPanel>
    </div>
  );
}
