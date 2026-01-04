import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "../server/src/routes/wallletRoutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/wallet", router);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "hello" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
