import express from "express";
import { calculateTemperatureProfile } from "../calculation/calculate.js";
import { calculateSummary } from "../calculation/calculateSummary.js";
import {
  calculationRequestSchema,
  type CalculationResponse,
} from "@counterflow/contracts";

export const calculationRouter = express.Router();

calculationRouter.post("/", async (req, res) => {
  const parseParams = calculationRequestSchema.safeParse(req.body);

  if (!parseParams.success)
    return res.status(400).json({ errors: parseParams.error.issues });

  const points = calculateTemperatureProfile(parseParams.data);

  const summary = calculateSummary(parseParams.data, points);

  const result: CalculationResponse = {
    points,
    summary,
  };

  return res.status(200).json(result);
});
