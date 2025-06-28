const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const priceFeedAddresses = {
  sepolia: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  goerli: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  polygon: "0xab594600376ec9fd91f8e885dadf0ce036862de0",
};

module.exports = buildModule("FundMeModule", (m) => {

const network = process.env.HARDHAT_NETWORK;
 let priceFeed;

  if (priceFeedAddresses[network]) {
    priceFeed = priceFeedAddresses[network]; // Real Chainlink price feed
  } else {
    priceFeed = m.contract("MockV3Aggregator", [8, "200000000000"]); // Mock for local and hardhat
  }

  const fundMe = m.contract("FundMe", [priceFeed]);

  return { fundMe, priceFeed };
});
