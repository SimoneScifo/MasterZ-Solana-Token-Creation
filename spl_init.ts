import {Keypair, Connection,clusterApiUrl} from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import wallet from "./wallet.json";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

console.log(`🔑 Loaded keypair securely! The public key is: ${keypair.publicKey.toBase58()}`);

(async () => {

    const mint = await createMint(
        connection,
        keypair,
        keypair.publicKey,
        null,
        2,
    );

    console.log("Mint Address:", mint.toBase58());
})()

//Mint Address: 46wSJbkkiafvM2p9VW1nWx2pLG8FKpUrQXYPb7y6CAmG