import qs from "qs";

async function swapEth(web3, account, fromToken, toToken, amount) {
  let contract;

  if (fromToken.symbol !== "WBTC") {
    let abi;

    const address = toToken.address;

    fetch(
      "https://api.etherscan.io/api?module=contract&action=getabi&address=" +
        address +
        "&apikey=YourApiKeyToken"
    )
      .then((response) => response.json())
      .then((data) => (abi = data));

    contract = new web3.eth.Contract(abi, address);
  }

  const params = {
    buyToken: toToken,
    sellToken: fromToken,
    sellAmount: amount // Always denominated in wei
  };

  console.log(qs.stringify(params));

  const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
  );

  const quote = await response.json();

  await contract.approve(quote.allowanceTarget, quote.sellAmount).send();

  web3.eth.defaultAccount = account;
  await web3.eth.sendTransaction(quote, { from: account });
}

export default swapEth;
