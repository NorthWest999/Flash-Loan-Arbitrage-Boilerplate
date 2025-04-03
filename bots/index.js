require('dotenv').config();
const Web3 = require('web3');

// Ensure all required environment variables are set
if (!process.env.INFURA_PROJECT_ID || !process.env.PRIVATE_KEY || !process.env.FLASH_LOAN_CONTRACT_ADDRESS) {
    console.error("💥 Missing environment variables. Please check your .env file.");
    process.exit(1);
}

const INFURA_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.FLASH_LOAN_CONTRACT_ADDRESS;

const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));

/**
 * Starts the arbitrage bot.
 */
async function startBot() {
    console.log("🤖 Starting Arbitrage Bot...");

    try {
        const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
        web3.eth.accounts.wallet.add(account);

        // Example transaction – in a real-world scenario, you would interact with your contract here
        console.log(`🎯 Ready to trade with address ${account.address}.`);
        
        // Dummy: Fetch current block number
        const block = await web3.eth.getBlockNumber();
        console.log(`🧱 Current Block: ${block}`);
    } catch (error) {
        console.error("💥 Error starting the bot:", error);
    }
}

// Start the bot and handle any uncaught errors
startBot().catch((e) => {
    console.error("💥 Uncaught error in bot:", e);
});
