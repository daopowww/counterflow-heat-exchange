import express from "express";
import { calculationInputSchema } from "../schemas/index.js";
import { calculateTemperatureProfile } from "../calculation/calculate.js";
import { calculateSummary } from "../calculation/calculateSummary.js";

export const calculationRouter = express.Router();

calculationRouter.post("/", async (req, res) => {
  const parseParams = calculationInputSchema.safeParse(req.body);

  if (!parseParams.success)
    return res.status(400).json({ errors: parseParams.error.issues });

  const points = calculateTemperatureProfile(parseParams.data);

  const summary = calculateSummary(parseParams.data, points);

  return res.status(200).json({
    points,
    summary: summary,
  });
});
