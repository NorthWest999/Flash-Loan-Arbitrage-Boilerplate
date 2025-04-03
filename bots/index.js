require('dotenv').config();
const Web3 = require('web3');

const INFURA_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.FLASH_LOAN_CONTRACT_ADDRESS;

const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));

async function startBot() {
    console.log("🤖 Starte Arbitrage-Bot...");

    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    web3.eth.accounts.wallet.add(account);

    // Beispieltransaktion – in der echten Welt würdest du deinen Vertrag hier ansprechen
    console.log(`🎯 Bereit, mit Adresse ${account.address} zu handeln.`);

    // Dummy: Hole Blocknummer
    const block = await web3.eth.getBlockNumber();
    console.log(`🧱 Aktueller Block: ${block}`);
}

startBot().catch((e) => {
    console.error("💥 Fehler im Bot:", e);
});
