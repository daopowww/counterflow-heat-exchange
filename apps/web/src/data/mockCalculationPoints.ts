export type CalculationPoint = {
  depth: string;
  materialTemperature: number;
  gasTemperature: number;
  temperatureDifference: number;
};

export const mockCalculationPoints: CalculationPoint[] = [
  { depth: "0", materialTemperature: 15, gasTemperature: 118, temperatureDifference: 103 },
  { depth: "1", materialTemperature: 290, gasTemperature: 345, temperatureDifference: 55 },
  { depth: "2", materialTemperature: 440, gasTemperature: 470, temperatureDifference: 30 },
  { depth: "3", materialTemperature: 520, gasTemperature: 536, temperatureDifference: 16 },
  { depth: "4", materialTemperature: 565, gasTemperature: 574, temperatureDifference: 9 },
  { depth: "5", materialTemperature: 588, gasTemperature: 592, temperatureDifference: 4 },
  { depth: "6", materialTemperature: 598, gasTemperature: 600, temperatureDifference: 2 },
];
