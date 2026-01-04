import express from "express";
import {
  CreateMnemonic,
  CreateWallet,
  NewAccount,
} from "../controllers/walletController.js";

const router = express.Router();

// route to generate a mnemoic :
router.get("/generate", CreateMnemonic);

// Create First Wallet :
router.post("/create" , CreateWallet);

// restore wallet using mnemonic & index :
router.post("/derive", NewAccount);

export default router;
