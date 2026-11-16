import "dotenv/config";
import express from "express";
import { variantsRouter } from "./routes/variants.js";
import { calculationRouter } from "./routes/calculation.js";
import { authRouter } from "./routes/auth.js";
import { sessionMiddleware } from "./lib/session.js";

const app = express();
app.use(sessionMiddleware);

const port = Number(process.env.PORT ?? 3001);

app.use(express.json());

app.use("/api/variants", variantsRouter);

app.use("/api/calculation", calculationRouter);

app.use("/api/auth", authRouter);

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`API запущен: http://localhost:${port}`);
});
