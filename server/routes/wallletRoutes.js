import express from "express";
import {
  generateMnemonic,
  createHDWallet,
  deriveWallet,
} from "../wallet/hdWallet.js";

const router = express.Router();



// route to generate a wallet:
router.post("/generate", async (req, res) => {
  try {
    const mnemonic = generateMnemonic();
    const { walletName } = req.body;
    const hdWallet = await createHDWallet(mnemonic);
    const wallet = deriveWallet(hdWallet, walletName, 0);
    console.log(" wallet is here : ", wallet);
    res.json({
      mnemonic,
      wallet,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// restore wallet using mnemonic & index :
router.post("/derive", async (req, res) => {
  try {
    const { mnemonic, walletName, index } = req.body;
    const hdWallet = await createHDWallet(mnemonic);
    const wallet = deriveWallet(hdWallet, walletName, index);
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
