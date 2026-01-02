import * as bip39 from "bip39";
import { HDNodeWallet } from "ethers";

const DERIVATION_PATH = {
  solana: "m/44'/60'/0'/0",
  ethereum: "m/44'/60'/0'/0/0",
  polygon: "m/44'/966'/0'/0/0",
  avalanche: "m/44'/9000'/0'/0/0",
  arbitrum: "m/44'/9001'/0'/0/0",
  optimism: "m/44'/10'/0'/0/0",
  bsc: "m/44'/714'/0'/0/0",
  fantom: "m/44'/250'/0'/0/0",
  aurora: "m/44'/1329'/0'/0/0",
  celo: "m/44'/52752'/0'/0/0",
  moonriver: "m/44'/1285'/0'/0/0",
  moonbeam: "m/44'/1284'/0'/0/0",
};

// to generate mnemonic (12 words):
export function generateMnemonic() {
  return bip39.generateMnemonic();
}

// create HD wallet from mnemonic:
export async function createHDWallet(mnemoic) {
  if (!bip39.validateMnemonic(mnemoic)) {
    throw new Error("Invalid mnemonic");
  }
  const seed = await bip39.mnemonicToSeed(mnemoic);
  return HDNodeWallet.fromSeed(seed);
}

// Derive wallet by index:
export function deriveWallet(hdWallet, walletName, index) {
  const wallet = hdWallet.derivePath(`${DERIVATION_PATH[walletName]}/${index}`);
  return {
    index,
    address: wallet.address,
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
  };
}
