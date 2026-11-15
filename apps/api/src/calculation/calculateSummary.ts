import { CalculationInput, CalculationResult } from "./types.js";

export const calculateSummary = (
  input: CalculationInput,
  points: CalculationResult[],
) => {
  const firstPoint = points[0];
  const lastPoint = points.at(-1);

  if (!firstPoint || !lastPoint) {
    throw new Error("Расчёт не вернул точки температурного профиля");
  }

  const materialOutletTemperature = lastPoint.materialTemperature;
  const gasOutletTemperature = firstPoint.gasTemperature;

  const heatFlowKw =
    input.materialMassFlow *
    input.materialSpecificHeatCapacity *
    (materialOutletTemperature - input.materialInletTemp);

  return { materialOutletTemperature, gasOutletTemperature, heatFlowKw };
};
