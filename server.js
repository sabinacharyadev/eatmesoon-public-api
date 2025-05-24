import "dotenv/config";
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ data: "eatmesoon" });
});

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
