import "dotenv/config";
import express from "express";
import { variantsRouter } from "./routes/variants.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(express.json());

app.use("/api/variants", variantsRouter);

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`API запущен: http://localhost:${port}`);
});
