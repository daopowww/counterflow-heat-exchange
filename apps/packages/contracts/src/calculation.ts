import * as z from "zod";

// Числовые параметры, отправляемые на расчёт.
export const calculationRequestSchema = z.object({
  bedHeight: z
    .number("Параметр должен быть числом")
    .positive("Число должно быть положительным"),
  materialInletTemp: z.number("Параметр должен быть числом"),
  gasVelocity: z
    .number("Параметр должен быть числом")
    .positive("Число должно быть положительным"),
  gasVolumetricHeatCapacity: z
    .number("Параметр должен быть числом")
    .positive("Число должно быть положительным"),
  materialMassFlow: z
    .number("Параметр должен быть числом")
    .positive("Число должно быть положительным"),
  gasInletTemp: z.number("Параметр должен быть числом"),
  materialSpecificHeatCapacity: z
    .number("Параметр должен быть числом")
    .positive("Число должно быть положительным"),
  volumetricHeatTransferCoefficient: z
    .number("Параметр должен быть числом")
    .positive("Число должно быть положительным"),
  apparatusDiameter: z
    .number("Параметр должен быть числом")
    .positive("Число должно быть положительным"),
  intervalCount: z
    .int("Число должно быть целочисленным")
    .positive("Число должно быть положительным"),
});

export type CalculationRequest = z.infer<typeof calculationRequestSchema>;

export const calculationPointSchema = z.object({
  depth: z.number(),
  materialTemperature: z.number(),
  gasTemperature: z.number(),
  temperatureDifference: z.number(),
});

export type CalculationPoint = z.infer<typeof calculationPointSchema>;

export const calculationSummarySchema = z.object({
  materialOutletTemperature: z.number(),
  gasOutletTemperature: z.number(),
  heatFlowKw: z.number(),
});

export type CalculationSummary = z.infer<typeof calculationSummarySchema>;

export const calculationResponseSchema = z.object({
  points: z.array(calculationPointSchema),
  summary: calculationSummarySchema,
});

export type CalculationResponse = z.infer<typeof calculationResponseSchema>;
