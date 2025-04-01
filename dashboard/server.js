require('dotenv').config();  // optional: falls z.B. PORT in .env konfiguriert
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Beispielhafte (statische) Status-Daten der Bots
const botStatus = {
  "eth-dai": {
    running: true,
    lastTx: "0xabc123...def456",   // Beispiel-Transaktionshash
    profit: 0.5                    // Beispiel-Gesamtprofit in ETH
  },
  "eth-usdc": {
    running: true,
    lastTx: "0xdef789...123456",
    profit: 1.2
  }
};

// Route für das Dashboard (HTML-Ausgabe)
app.get('/', (req, res) => {
  const daiStatus = botStatus["eth-dai"];
  const usdcStatus = botStatus["eth-usdc"];

  // Einfache HTML-Seite mit Statusübersicht
  res.send(`
    <html>
      <head>
        <title>Arbitrage Bot Monitoring</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 2em; }
          h1 { color: #333; }
          .bot { margin-bottom: 1.5em; }
          .bot p { margin: 0.2em 0; }
          hr { margin: 2em 0; }
        </style>
      </head>
      <body>
        <h1>Flash Loan Arbitrage Dashboard</h1>
        <div class="bot">
          <h2>Bot ETH-DAI</h2>
          <p>Status: <strong>${daiStatus.running ? "Läuft" : "Gestoppt"}</strong></p>
          <p>Letzte Transaktion: <code>${daiStatus.lastTx}</code></p>
          <p>Gesamtprofit: <strong>${daiStatus.profit} ETH</strong></p>
        </div>
        <hr/>
        <div class="bot">
          <h2>Bot ETH-USDC</h2>
          <p>Status: <strong>${usdcStatus.running ? "Läuft" : "Gestoppt"}</strong></p>
          <p>Letzte Transaktion: <code>${usdcStatus.lastTx}</code></p>
          <p>Gesamtprofit: <strong>${usdcStatus.profit} ETH</strong></p>
        </div>
      </body>
    </html>
  `);
});

// Server starten
app.listen(port, () => {
  console.log(`Dashboard läuft auf http://localhost:${port}`);
});
