import z from "zod";

export const calculationVariantInputSchema = z.object({
  name: z.string().trim().min(1),
  bedHeight: z.number("Параметр должен быть числом").positive("Число должно быть положительным"),
  materialInletTemp: z.number("Параметр должен быть числом"),
  gasVelocity: z.number("Параметр должен быть числом").positive("Число должно быть положительным"),
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

export type CalculationVariantInputType = z.infer<typeof calculationVariantInputSchema>;
