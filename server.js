import "dotenv/config";
import express from "express";
import { connectToDB } from "./config/dbConfig.js";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// connect to database
connectToDB();

// Routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

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
