import { type CalculationInput, type Coefficients } from "./types.js";

export const calculateCoefficients = (input: CalculationInput): Coefficients => {
  const crossSectionArea = (Math.PI * input.apparatusDiameter ** 2) / 4;
  const gasVolumetricFlow = input.gasVelocity * crossSectionArea;
  const materialHeatCapacityFlow =
    input.materialMassFlow * input.materialSpecificHeatCapacity * 1000;
  const gasHeatCapacityFlow = gasVolumetricFlow * input.gasVolumetricHeatCapacity * 1000;
  const heatCapacityRatio = materialHeatCapacityFlow / gasHeatCapacityFlow;
  const dimensionlessBedHeight =
    (input.volumetricHeatTransferCoefficient * input.bedHeight) /
    (input.gasVelocity * input.gasVolumetricHeatCapacity * 1000);
  const exponentCoefficient = (heatCapacityRatio - 1) / heatCapacityRatio;
  const profileDenominator =
    1 - heatCapacityRatio * Math.exp(exponentCoefficient * dimensionlessBedHeight);

  return {
    crossSectionArea,
    gasVolumetricFlow,
    materialHeatCapacityFlow,
    gasHeatCapacityFlow,
    heatCapacityRatio,
    dimensionlessBedHeight,
    exponentCoefficient,
    profileDenominator,
  };
};
