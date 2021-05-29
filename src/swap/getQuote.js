import { SwapQuoter } from "@0x/asset-swapper";
import connectWeb3 from "../connectWeb3";

async function getQuote(fromToken, toToken) {
  const { web3 } = connectWeb3();

  const apiUrl = "https://api.0x.org/sra/";
  // const daiTokenAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
  // const wethTokenAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

  const quoter = SwapQuoter.getSwapQuoterForStandardRelayerAPIUrl(
    web3.provider,
    apiUrl
  );

  // Get a quote to buy three units of DAI
  const quote = await quoter.getMarketBuySwapQuoteAsync(
    fromToken,
    toToken,
    web3.utils.fromWei(3, "ether")
  );
  return quote;
}

export default getQuote;
