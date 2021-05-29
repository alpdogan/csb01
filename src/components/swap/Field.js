import React, { useEffect } from "react";
import TokenSelector from "./TokenSelector";
import PercentageButtons from "./PercentageButtons";
import AmountInput from "./AmountInput";

export default function Field({
  web3,
  account,
  balance,
  setBalance,
  amount,
  setAmount,
  token,
  setToken
}) {
  useEffect(() => {
    async function fetchBalance() {
      const apiKey = "YM8NVZCY71QTATV732YF6BAMB7SFNWYUV6";
      const contract_address = token.address;
      if (account) {
        fetch(
          "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" +
            contract_address +
            "&address=" +
            account +
            "&tag=latest&apikey=" +
            apiKey
        )
          .then((response) => response.json())
          .then((data) => setBalance(data.result));
      }
    }

    fetchBalance();
  }, [token, account, setBalance]);

  function setPercentage(percent) {
    console.log(percent);
    setAmount(percent * balance);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          border: "1px solid #000",
          padding: "5px",
          borderRadius: "5px"
        }}
      >
        <TokenSelector token={token} setToken={setToken} />
        <AmountInput amount={amount} setAmount={setAmount} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <PercentageButtons setPercentage={setPercentage} />
        Balance: {balance}
      </div>
    </>
  );
}
