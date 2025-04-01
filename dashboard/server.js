require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// Example static bot status data
const botStatus = {
  "eth-dai": {
    running: true,
    lastTx: "0xabc123...def456",
    profit: 0.5
  },
  "eth-usdc": {
    running: true,
    lastTx: "0xdef789...123456",
    profit: 1.2
  }
};

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route for the dashboard
app.get('/', (req, res) => {
  res.render('dashboard', { botStatus });
});

// Start server with error handling
app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Dashboard running at http://localhost:${port}`);
  }
});
