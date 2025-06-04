import "dotenv/config";
import express from "express";
import { connectToDB } from "./config/dbConfig.js";

const app = express();
const PORT = 3000;

app.use(express.json());

connectToDB();

if (!process.env.PROD) {
  app.listen(PORT, (error) => {
    error
      ? console.log(error)
      : console.log(`Server running successfully on http://localhost:${PORT}`);
  });
}

export default (req, res) => {
  app(req, res);
};
