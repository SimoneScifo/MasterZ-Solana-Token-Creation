import { Keypair, Connection, LAMPORTS_PER_SOL, clusterApiUrl} from "@solana/web3.js";
import {getExplorerLink} from "@solana-developers/helpers";
import wallet from "./wallet.json";

//Import secretKey from wallet.json
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Initialize connection to devnet
const connection = new Connection(clusterApiUrl("devnet"), "finalized");

//Request Airdrop 2 SOL
(async () => {
    try {
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,    
            2 * LAMPORTS_PER_SOL
        );
        
        const explorerLink = getExplorerLink("transaction", airdropSignature, "devnet");
        console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);
    } catch (error) {
        console.error(error);
    }
})();

//Transaction 3SYg4DErQcjC2PtWtAqEqjaRxBQRdXHi4BdFbt1W8MZkYTfTAwDM9NApFYTjjXYrQpNKwNbUx4WtZLVxh7Bcpkjj