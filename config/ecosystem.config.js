require('dotenv').config();

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  apps: [
    // 🔁 ETH-DAI Arbitrage Bot
    {
      name: "bot-eth-dai",
      script: "arbBot.js",
      cwd: "bots/eth-dai",
      watch: isDev,
      env: {
        NODE_ENV: process.env.NODE_ENV || "production",
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID
      }
    },

    // 💸 ETH-USDC Arbitrage Bot
    {
      name: "bot-eth-usdc",
      script: "arbBot.js",
      cwd: "bots/eth-usdc",
      watch: isDev,
      env: {
        NODE_ENV: process.env.NODE_ENV || "production",
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID
      }
    },

    // 📊 Dashboard / API
    {
      name: "dashboard",
      script: "server.js",
      cwd: "dashboard",
      watch: isDev,
      env: {
        NODE_ENV: process.env.NODE_ENV || "production",
        PORT: process.env.PORT || 3000
      }
    }
  ]
};
