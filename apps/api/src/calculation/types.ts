import type {
  CalculationRequest,
  CalculationPoint,
} from "@counterflow/contracts";

export type CalculationInput = CalculationRequest;
export type CalculationResult = CalculationPoint;
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
