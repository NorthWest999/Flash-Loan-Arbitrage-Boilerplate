// Einfacher Arbitrage-Bot für ETH-DAI
// Lädt Umgebungsvariablen aus bots/eth-dai/.env
require('dotenv').config();  // .env im aktuellen Arbeitsverzeichnis laden

const ethers = require('ethers');
const winston = require('winston');

// Logger konfigurieren
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'arbBot.log' })
    ]
});

// RPC-Provider und Wallet initialisieren
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet   = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// FlashLoan Contract-Instanz erstellen (ABI mit mindestens der benötigten Funktion)
const FLASHLOAN_ABI = [
    "function requestFlashLoan(address _token, uint256 _amount) external"
];
const flashLoanContract = new ethers.Contract(process.env.FLASHLOAN_CONTRACT, FLASHLOAN_ABI, wallet);

// Zu überwachende Token-Adressen aus der Konfiguration
const assetToBorrow = process.env.ASSET_BORROW;      // z.B. WETH-Adresse
const stableAsset   = process.env.STABLE_ASSET;      // z.B. DAI-Adresse

// Konfiguration für Arbitrage
const borrowAmountEth = parseFloat(process.env.BORROW_AMOUNT_ETH || "1");  // z.B. 1 ETH
const borrowAmountWei = ethers.utils.parseEther(borrowAmountEth.toString());
const priceDiffThreshold = Number(process.env.PRICE_DIFF_THRESHOLD || "0"); // z.B. 5 (DAI Unterschied)
const checkInterval = Number(process.env.CHECK_INTERVAL || "30000"); // z.B. 30000 ms

// Simulierte Preisabfrage (in echtem Bot: API oder On-Chain-Preisabfragen nutzen)
async function getPrices() {
    // In einem echten Szenario würde man hier z.B. Uniswap und SushiSwap konsultieren.
    // Wir simulieren zwei unterschiedliche Preise für 1 ETH in DAI:
    const priceDexA = 1800;  // z.B. Preis auf DEX A: 1 ETH = 1800 DAI
    const priceDexB = 1820;  // z.B. Preis auf DEX B: 1 ETH = 1820 DAI
    return { priceDexA, priceDexB };
}

// Hauptfunktion des Bots: Prüft periodisch auf Arbitrage-Möglichkeiten
async function checkArbitrageOpportunity() {
    try {
        const { priceDexA, priceDexB } = await getPrices();
        logger.info(`Preis DEX A: ${priceDexA} DAI, Preis DEX B: ${priceDexB} DAI`);

        // Prüft, ob die Preisdifferenz den Schwellenwert überschreitet
        if (priceDexB - priceDexA > priceDiffThreshold) {
            logger.info("Arbitrage-Möglichkeit erkannt! Starte Flash Loan...");

            // Flash Loan über Smart Contract anfordern
            const tx = await flashLoanContract.requestFlashLoan(assetToBorrow, borrowAmountWei);
            await tx.wait();  // auf Bestätigung warten
            logger.info(`Flash-Loan-Transaktion gesendet. TX Hash: ${tx.hash}`);
        } else {
            logger.info("Keine profitable Arbitrage-Möglichkeit gefunden.");
        }
    } catch (error) {
        logger.error(`Fehler beim Prüfen der Arbitrage: ${error}`);
    }
}

// Starte den Bot mit Intervall
logger.info("Starte ETH-DAI Arbitrage-Bot...");
setInterval(checkArbitrageOpportunity, checkInterval);  // konfigurierbares Intervall
