import { calculateCoefficients } from "./coefficients.js";
import type { CalculationInput, CalculationResult } from "./types.js";

export const calculateTemperatureProfile = (input: CalculationInput): CalculationResult[] => {
  const { heatCapacityRatio, dimensionlessBedHeight, exponentCoefficient, profileDenominator } =
    calculateCoefficients(input);
  const inletTemperatureDifference = input.gasInletTemp - input.materialInletTemp;
  const points: CalculationResult[] = [];

  for (let index = 0; index <= input.intervalCount; index += 1) {
    const depth = (index * input.bedHeight) / input.intervalCount;
    const dimensionlessDepth =
      (input.volumetricHeatTransferCoefficient * depth) /
      (input.gasVelocity * input.gasVolumetricHeatCapacity * 1000);
    const exponential = Math.exp(exponentCoefficient * dimensionlessDepth);

    const materialFactor =
      Math.abs(heatCapacityRatio - 1) < 1e-8
        ? dimensionlessDepth / (1 + dimensionlessBedHeight)
        : (1 - exponential) / profileDenominator;
    const gasFactor =
      Math.abs(heatCapacityRatio - 1) < 1e-8
        ? (1 + dimensionlessDepth) / (1 + dimensionlessBedHeight)
        : (1 - heatCapacityRatio * exponential) / profileDenominator;

    const materialTemperature =
      input.materialInletTemp + inletTemperatureDifference * materialFactor;
    const gasTemperature = input.materialInletTemp + inletTemperatureDifference * gasFactor;

    points.push({
      depth,
      materialTemperature,
      gasTemperature,
      temperatureDifference: gasTemperature - materialTemperature,
    });
  }

  return points;
};
