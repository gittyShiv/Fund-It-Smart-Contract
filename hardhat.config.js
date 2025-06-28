require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");
require("hardhat-gas-reporter");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",

  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts : [process.env.SEPOLIA_PRIVATE_KEY],
    },
    localhost: {
      url: "http://127.0.0.1:8545/",      
    },
    ///////Add more network
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    // coinmarketcap: process.env.COIN_MARKET_CAP_API,

  },
  solidity: "0.8.7",
};
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });