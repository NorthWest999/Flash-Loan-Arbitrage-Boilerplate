require('dotenv').config();

module.exports = {
  apps: [
    {
      name: "bot-eth-dai",
      script: "bots/eth-dai/arbBot.js",
      cwd: "bots/eth-dai",
      env: {
        NODE_ENV: process.env.NODE_ENV || "production"
      },
      env_production: {
        NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      },
      watch: process.env.NODE_ENV === "development"
    },
    {
      name: "bot-eth-usdc",
      script: "bots/eth-usdc/arbBot.js",
      cwd: "bots/eth-usdc",
      env: {
        NODE_ENV: process.env.NODE_ENV || "production"
      },
      env_production: {
        NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      },
      watch: process.env.NODE_ENV === "development"
    },
    {
      name: "dashboard",
      script: "dashboard/server.js",
      cwd: "dashboard",
      env: {
        NODE_ENV: process.env.NODE_ENV || "production",
        PORT: process.env.PORT || 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3000
      },
      watch: process.env.NODE_ENV === "development"
    }
  ]
};
