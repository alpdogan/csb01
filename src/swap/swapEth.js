import qs from "qs";

async function swapEth(web3, account, token, amount) {
  const params = {
    buyToken: "DAI",
    sellToken: "ETH",
    sellAmount: amount // Always denominated in wei
  };

  console.log(qs.stringify(params));

  const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
  );

  const data = await response.json();

  console.log(data);

  web3.eth.defaultAccount = account;
  await web3.eth.sendTransaction(data, { from: account });
}

export default swapEth;
