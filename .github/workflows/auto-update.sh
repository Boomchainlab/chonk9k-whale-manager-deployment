#!/bin/bash

echo "=== Building and Signing the Transaction ==="
npx tsx update-authority.ts

if [ $? -ne 0 ]; then
  echo "Transaction build failed. Exiting."
  exit 1
fi

SIGNED_TX=$(cat signed-transaction.txt)

echo "=== Broadcasting Transaction to Solana Mainnet ==="

curl https://api.mainnet-beta.solana.com \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "sendTransaction",
    "params": [
      "'"$SIGNED_TX"'",
      {
        "encoding": "base64"
      }
    ]
  }'

echo "=== Process Complete ==="
