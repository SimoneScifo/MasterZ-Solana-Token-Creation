import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`New wallet generated: ${keypair.publicKey.toBase58()} \n\n To save: [${keypair.secretKey}]`)

//Address 1 generated: 2ZczFUBjCXxHQ9pEYoAwX2ig3Ay4iQutMfxNXX4b5xtC
