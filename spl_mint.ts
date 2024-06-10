import { Keypair, Connection, clusterApiUrl, PublicKey} from "@solana/web3.js";
import wallet from "./wallet.json";
import { mintTo, getOrCreateAssociatedTokenAccount} from "@solana/spl-token";


const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const suppliedMintAddress = process.argv[2];
const mint = new PublicKey(suppliedMintAddress);
const amount = 10e2;

//Create AssociateTokenAccount
(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey,
    );

    const ata = tokenAccount.address;
    console.log("Associated Token Account: ", ata.toBase58());

//Create MintTo Associated Token Account
    await mintTo(
        connection,
        keypair,
        mint,
        ata,
        keypair.publicKey,
        amount
    );

    console.log("Minted", amount, "to", ata.toBase58());
})()

//ATA: GBjcra7Qw3ed3WiGPwbjmowCCoq58QLVLM6bK9Lk7nAW