module.exports = {
  apps: [
    {
      name: "bot-eth-dai",
      script: "bots/eth-dai/arbBot.js",
      cwd: "bots/eth-dai",          // Arbeitsverzeichnis (für .env und relative Imports)
      env: {
        NODE_ENV: "production"
      }
    },
    {
      name: "bot-eth-usdc",
      script: "bots/eth-usdc/arbBot.js",
      cwd: "bots/eth-usdc",
      env: {
        NODE_ENV: "production"
      }
    },
    {
      name: "dashboard",
      script: "dashboard/server.js",
      cwd: "dashboard",
      env: {
        NODE_ENV: "production",
        PORT: 3000    // Der Port kann hier konfiguriert werden
      }
    }
  ]
};
