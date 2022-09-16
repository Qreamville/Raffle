import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import "@typechain/hardhat";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL || "",
      accounts: [process.env.PRIVATE_KEY || ""],
      chainId: 5,
    },
  },
};

export default config;
