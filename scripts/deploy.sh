#!/bin/bash
# This script compiles and deploys the FlashLoanArbitrage Smart Contract.
# Prerequisites: Foundry (forge) installed, ENV variables RPC_URL and DEPLOYER_PRIVATE_KEY set.

# Set project directory as working directory (in case the script is called from elsewhere)
PROJECT_DIR="$(dirname "$0")/.."
cd "$PROJECT_DIR" || { echo "Failed to change directory to $PROJECT_DIR"; exit 1; }

echo "$(date +'%Y-%m-%d %H:%M:%S') - Compiling Smart Contracts..."
if ! forge build; then
  echo "$(date +'%Y-%m-%d %H:%M:%S') - Error: Failed to compile Smart Contracts."
  exit 1
fi

echo "$(date +'%Y-%m-%d %H:%M:%S') - Deploying FlashLoanArbitrage Smart Contract..."
# Note: The address of the PoolAddressesProvider must be passed as an argument or defined in ENV.
# Example: DEPLOYER_PRIVATE_KEY and RPC_URL should be in a .env file in the project directory.
source .env 2>/dev/null  # Load RPC_URL and DEPLOYER_PRIVATE_KEY if defined in .env in project root.
if [[ -z "$RPC_URL" || -z "$DEPLOYER_PRIVATE_KEY" ]]; then
  echo "$(date +'%Y-%m-%d %H:%M:%S') - Error: RPC_URL or DEPLOYER_PRIVATE_KEY not set. Please create a .env file with these values."
  exit 1
fi

# Optional: PoolAddressesProvider via ENV
if [[ -z "$POOL_ADDRESSES_PROVIDER" ]]; then
  echo "$(date +'%Y-%m-%d %H:%M:%S') - Warning: POOL_ADDRESSES_PROVIDER not set. Using a placeholder."
  POOL_ADDRESSES_PROVIDER="0x0000000000000000000000000000000000000000"  # Placeholder, adjust!
fi

# Deployment via Foundry (forge)
if ! forge create ./contracts/FlashLoanArbitrage.sol:FlashLoanArbitrage \
    --constructor-args $POOL_ADDRESSES_PROVIDER \
    --rpc-url $RPC_URL \
    --private-key $DEPLOYER_PRIVATE_KEY; then
  echo "$(date +'%Y-%m-%d %H:%M:%S') - Error: Failed to deploy Smart Contract."
  exit 1
fi

echo "$(date +'%Y-%m-%d %H:%M:%S') - Smart Contract deployed successfully."
