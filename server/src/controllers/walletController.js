import {
  generateMnemonic,
  createHDWallet,
  deriveWallet,
} from "../wallet/hdWallet.js";

export const CreateMnemonic = async (req, res) => {
  try {
    const mnemonic = await generateMnemonic();
    res.json(mnemonic);
  } catch (error) {
    res.status(500).json("error while generating mnemonic", error.message);
  }
};

export const CreateWallet = async (req, res) => {
  try {
    const { mnemonic, walletName } = req.body;
    const seedData = await createHDWallet(mnemonic);
    const wallet = await deriveWallet(seedData, walletName, 0);
    res.json({
      wallet,
      walletName,
    });
  } catch (error) {
    res.status(500).json("error while generatig wallet : ", error.message);
  }
};

export const NewAccount = async (req, res) => {
  try {
    const { mnemonic, walletName, index } = req.body;
    const hdWallet = await createHDWallet(mnemonic);
    const newAccount = await deriveWallet(hdWallet, walletName, index);
    res.json({
      newAccount,
      walletName,
    });
  } catch (error) {
    res.status(500).json("unable to create newAccount :", error.message);
  }
};
