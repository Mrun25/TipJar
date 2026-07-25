require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SEPOLIA_URL  = process.env.QUICKNODE_SEPOLIA_URL || "https://ethereum-sepolia-rpc.publicnode.com";
const PRIVATE_KEY  = process.env.PRIVATE_KEY           || "0x" + "0".repeat(64); // safe placeholder
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY    || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: PRIVATE_KEY !== ("0x" + "0".repeat(64)) ? [PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_KEY,
    },
  },
  paths: {
    sources:   "./contracts",
    tests:     "./test",
    cache:     "./cache",
    artifacts: "./artifacts",
  },
};
