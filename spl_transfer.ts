import { Keypair, Connection, clusterApiUrl, PublicKey} from "@solana/web3.js";
import { transfer, getOrCreateAssociatedTokenAccount} from "@solana/spl-token";
import wallet from "./wallet.json";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const mint = new PublicKey("46wSJbkkiafvM2p9VW1nWx2pLG8FKpUrQXYPb7y6CAmG");
const fromAta = new PublicKey("GBjcra7Qw3ed3WiGPwbjmowCCoq58QLVLM6bK9Lk7nAW");

const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        keypair,
        mint,
        to.publicKey,
    );

    const toAta = tokenAccount.address;
    console.log("Receiver Associated Token Account: ", toAta.toBase58());

    const amountToAta = tokenAccount.amount;
    console.log("Amount in ATA: ", amountToAta.toString());

    const amount = 1e2;

    await transfer(
        connection,
        keypair,
        fromAta,
        toAta,
        keypair,
        amount
    );

    console.log("Transferred", amount, "from", fromAta.toBase58(), "to", toAta.toBase58());
})()

//Receiver account Pub Key: EkUhmZKqUPPqCbfrxNrQj5nYXq39XC9HyC2SrA278ZDB 
//Receiver Associated Token Account:  Ca89pBW1VrtXcReA34USZPC5tWTPVMkvWBmno4HzGAy9
//from GBjcra7Qw3ed3WiGPwbjmowCCoq58QLVLM6bK9Lk7nAW to Ca89pBW1VrtXcReA34USZPC5tWTPVMkvWBmno4HzGAy9
//Transaction: 4Yg3P1sJrVBtssE6iTEUzoQkkXVk9A6FX66suosrtyZ8CJdmzissxfJMp6Vm5Au5UD9UVqtUagXefYiun14V8jT8