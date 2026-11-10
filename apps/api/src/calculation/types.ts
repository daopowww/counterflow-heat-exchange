import { type CalculationVariantInputType } from "../schemas/index.js";

export type CalculationInput = Omit<CalculationVariantInputType, "name">;
export type CalculationResult = {
  depth: number;
  materialTemperature: number;
  gasTemperature: number;
  temperatureDifference: number;
};
export type Coefficients = {
  crossSectionArea: number;
  gasVolumetricFlow: number;
  materialHeatCapacityFlow: number;
  gasHeatCapacityFlow: number;
  heatCapacityRatio: number;
  dimensionlessBedHeight: number;
  exponentCoefficient: number;
  profileDenominator: number;
};
