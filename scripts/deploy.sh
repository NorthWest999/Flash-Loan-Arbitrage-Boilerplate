#!/bin/bash
# Dieses Skript kompiliert und deployed den FlashLoanArbitrage Smart Contract.
# Voraussetzungen: Foundry (forge) ist installiert, ENV Variablen RPC_URL und DEPLOYER_PRIVATE_KEY sind gesetzt.

# Projekt-Verzeichnis als Arbeitsverzeichnis setzen (falls Skript woanders aufgerufen wird)
PROJECT_DIR="$(dirname "$0")/.."
cd "$PROJECT_DIR"

echo "Compiliere Smart Contracts..."
forge build

echo "Deploye FlashLoanArbitrage Smart Contract..."
# Hinweis: Die Adresse des PoolAddressesProvider muss als Argument übergeben oder in ENV definiert sein.
# Beispiel: DEPLOYER_PRIVATE_KEY und RPC_URL sollten in einer .env im Projektverzeichnis stehen.
source .env 2>/dev/null   # Lädt RPC_URL und DEPLOYER_PRIVATE_KEY, falls in .env im Projektroot definiert.
if [[ -z "$RPC_URL" || -z "$DEPLOYER_PRIVATE_KEY" ]]; then
  echo "Fehler: RPC_URL oder DEPLOYER_PRIVATE_KEY nicht gesetzt. Bitte .env mit diesen Werten anlegen."
  exit 1
fi

# Optional: PoolAddressesProvider via ENV
if [[ -z "$POOL_ADDRESSES_PROVIDER" ]]; then
  echo "Warnung: POOL_ADDRESSES_PROVIDER nicht gesetzt. Es wird ein Placeholder verwendet."
  POOL_ADDRESSES_PROVIDER="0x0000000000000000000000000000000000000000"  # Platzhalter, anpassen!
fi

# Deployment via Foundry (forge)
forge create ./contracts/FlashLoanArbitrage.sol:FlashLoanArbitrage \
    --constructor-args $POOL_ADDRESSES_PROVIDER \
    --rpc-url $RPC_URL \
    --private-key $DEPLOYER_PRIVATE_KEY
