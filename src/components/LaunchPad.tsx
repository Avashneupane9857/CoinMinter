import React, { useState } from "react";
import { Terminal, Rocket, Image, Coins } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import {
  createInitializeInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  ExtensionType,
  getMintLen,
  LENGTH_SIZE,
  MINT_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
const packMetadata = (metadata: any) => {
  const name = Buffer.from(metadata.name);
  const symbol = Buffer.from(metadata.symbol);
  const uri = Buffer.from(metadata.uri);

  return Buffer.concat([
    name,
    Buffer.alloc(32 - name.length),
    symbol,
    Buffer.alloc(10 - symbol.length),
    uri,
    Buffer.alloc(200 - uri.length),
  ]);
};
function LaunchPad() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    imageUrl: "",
    initialSupply: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.publicKey || !wallet.signTransaction) {
      console.error("Wallet not connected!");
      return;
    }

    const keypair = Keypair.generate();
    const metadata = {
      mint: keypair.publicKey,
      name: formData.name,
      symbol: formData.symbol,
      uri: formData.imageUrl,
      additionalMetadata: [],
    };
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const packedMetadata = packMetadata(metadata);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + packedMetadata.length;
    const lamports = await connection.getMinimumBalanceForRentExemption(
      mintLen + metadataLen
    );
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(
        keypair.publicKey,
        wallet.publicKey,
        keypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeMintInstruction(
        keypair.publicKey,
        9,
        wallet.publicKey,
        null,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: keypair.publicKey,
        metadata: keypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey,
        updateAuthority: wallet.publicKey,
      })
    );
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.partialSign(keypair);
    console.log(transaction, connection);

    await wallet.sendTransaction(transaction, connection);
    console.log(`Token mint created at ${keypair.publicKey.toBase58()}`);

    // left
    // const associatedToken = getAssociatedTokenAddressSync(
    //   keypair.publicKey,
    //   wallet.publicKey,
    //   false,
    //   TOKEN_2022_PROGRAM_ID
    // );

    console.log(associatedToken.toBase58());

    //   const transaction2 = new Transaction().add(
    //     createAssociatedTokenAccountInstruction(
    //       wallet.publicKey,
    //       associatedToken,
    //       wallet.publicKey,
    //       keypair.publicKey,
    //       TOKEN_2022_PROGRAM_ID
    //     )
    //   );

    //   await wallet.sendTransaction(transaction2, connection);

    //   const transaction3 = new Transaction().add(
    //     createMintToInstruction(
    //       keypair.publicKey,
    //       associatedToken,
    //       wallet.publicKey,
    //       1000000000,
    //       [],
    //       TOKEN_2022_PROGRAM_ID
    //     )
    //   );

    //   await wallet.sendTransaction(transaction3, connection);

    //   console.log("Minted!");
    // };
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6">
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"></div>
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            Solana LaunchPad
          </h1>
          <p className="text-gray-400 mt-2">Create your token in seconds</p>
        </div>

        <Card className="bg-gray-900/50 backdrop-blur-md border border-gray-800">
          <CardContent className="p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                    <Terminal className="w-4 h-4 mr-2" />
                    Token Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Cosmic Coin"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                    <Rocket className="w-4 h-4 mr-2" />
                    Symbol
                  </label>
                  <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                    placeholder="e.g., CSMC"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                    <Image className="w-4 h-4 mr-2" />
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Enter token image URL"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                    <Coins className="w-4 h-4 mr-2" />
                    Initial Supply
                  </label>
                  <input
                    type="number"
                    name="initialSupply"
                    value={formData.initialSupply}
                    onChange={handleChange}
                    placeholder="Enter initial supply"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={createToken}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition duration-200 transform hover:scale-[1.02]"
                >
                  Launch Token
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LaunchPad;
