// Einfacher Arbitrage-Bot für ETH-USDC
require('dotenv').config();  // Lädt bots/eth-usdc/.env

const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet   = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const FLASHLOAN_ABI = [
  "function requestFlashLoan(address _token, uint256 _amount) external"
];
const flashLoanContract = new ethers.Contract(process.env.FLASHLOAN_CONTRACT, FLASHLOAN_ABI, wallet);

// Adressen aus Umgebungsvariablen
const assetToBorrow = process.env.ASSET_BORROW;   // z.B. WETH
const stableAsset   = process.env.STABLE_ASSET;   // z.B. USDC

const borrowAmountEth = parseFloat(process.env.BORROW_AMOUNT_ETH || "1");
const borrowAmountWei = ethers.utils.parseEther(borrowAmountEth.toString());
const priceDiffThreshold = Number(process.env.PRICE_DIFF_THRESHOLD || "0");

const CHECK_INTERVAL_MS = 30000; // Intervallzeit in Millisekunden

// Simulierte Preisabfrage (ETH in USDC auf zwei DEXen)
async function getPrices() {
    // Beispiel: zwei verschiedene Preise für 1 ETH in USDC simulieren
    const priceDexA = 1800;  // z.B. 1 ETH = 1800 USDC (Annäherung, da USDC ~ 1 USD)
    const priceDexB = 1812;  // z.B. 1 ETH = 1812 USDC
    return { priceDexA, priceDexB };
}

async function checkArbitrageOpportunity() {
    try {
        const { priceDexA, priceDexB } = await getPrices();
        console.log(`[ETH-USDC] Preis DEX A: ${priceDexA} USDC, Preis DEX B: ${priceDexB} USDC`);

        if (priceDexB - priceDexA > priceDiffThreshold) {
            console.log("[ETH-USDC] Arbitrage-Möglichkeit erkannt! Starte Flash Loan...");
            const tx = await flashLoanContract.requestFlashLoan(assetToBorrow, borrowAmountWei);
            await tx.wait();
            console.log("[ETH-USDC] Flash-Loan-Transaktion gesendet. TX Hash:", tx.hash);
        } else {
            console.log("[ETH-USDC] Keine profitable Arbitrage-Möglichkeit gefunden.");
        }
    } catch (error) {
        console.error("[ETH-USDC] Fehler beim Prüfen der Arbitrage:", error);
    }
}

async function main() {
    console.log("Starte ETH-USDC Arbitrage-Bot...");

    // Überprüfen, ob alle erforderlichen Umgebungsvariablen geladen sind
    if (!process.env.RPC_URL || !process.env.PRIVATE_KEY || !process.env.FLASHLOAN_CONTRACT || !process.env.ASSET_BORROW || !process.env.STABLE_ASSET) {
        console.error("Fehlende Umgebungsvariablen. Bitte überprüfen Sie die .env-Datei.");
        process.exit(1);
    }

    // Starte das Intervall für die Arbitrage-Überprüfung
    setInterval(checkArbitrageOpportunity, CHECK_INTERVAL_MS);
}

// Führe das Hauptprogramm aus
main().catch(error => {
    console.error("[ETH-USDC] Fehler beim Starten des Bots:", error);
});
