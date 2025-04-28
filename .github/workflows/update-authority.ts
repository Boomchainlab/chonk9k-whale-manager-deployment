import {
  Connection,
  Transaction,
  PublicKey,
  Keypair,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { createUpdateMetadataAccountV2Instruction } from '@metaplex-foundation/mpl-token-metadata';
import fs from 'fs';

async function main() {
  const connection = new Connection('https://api.mainnet-beta.solana.com');

  // Load old authority (payer) Keypair
  const payer = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync('payer-keypair.json', 'utf8')))
  );

  // Mint and Metadata PDA
  const mint = new PublicKey('DnUsQnwNot38V9JbisNC18VHZkae1eKK5N2Dgy55pump');
  const metadataAccount = new PublicKey('CtkH5KrXWamVbaxK6qmbkSGJzKD2Tbsrs1Dsz1xnKoWL');

  // New Update Authority
  const newUpdateAuthority = new PublicKey('C8QHPhGa8YGCmDysmHZVpYSLKFa7Gb75kAfQWAGztvJ1');

  const instruction = createUpdateMetadataAccountV2Instruction({
    metadata: metadataAccount,
    updateAuthority: payer.publicKey,
  }, {
    updateMetadataAccountArgsV2: {
      updateAuthority: newUpdateAuthority,
      primarySaleHappened: null,
      isMutable: null,
      data: null,
    }
  });

  const { blockhash } = await connection.getLatestBlockhash();
  const tx = new Transaction({
    feePayer: payer.publicKey,
    recentBlockhash: blockhash,
  }).add(instruction);

  tx.sign(payer);

  const serializedTx = tx.serialize();
  const base64Tx = serializedTx.toString('base64');

  fs.writeFileSync('signed-transaction.txt', base64Tx);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
