import z from "zod";

const stringToNumber = z
  .string()
  .trim()
  .min(1, "Поле обязательно к заполнению")
  .transform((value) => Number(value));

export const calculationFormSchema = z.object({
  bedHeight: stringToNumber.pipe(
    z
      .number("Параметр должен быть числом")
      .positive("Число должно быть положительным"),
  ),
  materialInletTemp: stringToNumber.pipe(
    z.number("Параметр должен быть числом"),
  ),
  gasVelocity: stringToNumber.pipe(
    z
      .number("Параметр должен быть числом")
      .positive("Число должно быть положительным"),
  ),
  gasVolumetricHeatCapacity: stringToNumber.pipe(
    z
      .number("Параметр должен быть числом")
      .positive("Число должно быть положительным"),
  ),
  materialMassFlow: stringToNumber.pipe(
    z
      .number("Параметр должен быть числом")
      .positive("Число должно быть положительным"),
  ),
  gasInletTemp: stringToNumber.pipe(z.number("Параметр должен быть числом")),
  materialSpecificHeatCapacity: stringToNumber.pipe(
    z
      .number("Параметр должен быть числом")
      .positive("Число должно быть положительным"),
  ),
  volumetricHeatTransferCoefficient: stringToNumber.pipe(
    z
      .number("Параметр должен быть числом")
      .positive("Число должно быть положительным"),
  ),
  apparatusDiameter: stringToNumber.pipe(
    z
      .number("Параметр должен быть числом")
      .positive("Число должно быть положительным"),
  ),
  intervalCount: stringToNumber.pipe(
    z
      .int("Число должно быть целочисленным")
      .positive("Число должно быть положительным"),
  ),
});

export const calculationPoint = z.object({
  depth: z.number(),
  materialTemperature: z.number(),
  gasTemperature: z.number(),
  temperatureDifference: z.number(),
});

export type CalculationPoint = z.infer<typeof calculationPoint>;

export const calculationSummary = z.object({
  materialOutletTemperature: z.number(),
  gasOutletTemperature: z.number(),
  heatFlowKw: z.number(),
});

export type CalculationSummary = z.infer<typeof calculationSummary>;

export const calculationResponse = z.object({
  points: calculationPoint.array(),
  summary: calculationSummary,
});

export type CalculationResponse = z.infer<typeof calculationResponse>;

export const calculationLocalStorage = z.output(calculationFormSchema);

export type CalculationLocalStorage = z.infer<typeof calculationLocalStorage>;

export const calculationInputs = z.output(calculationFormSchema);

export type CalculationInputs = z.infer<typeof calculationInputs>;

export const variantFormSchema = z.object({
  name: z.string().trim().min(1),
});

export type VariantFormType = z.infer<typeof variantFormSchema>;

export const calculationPostRequest = z.output(calculationFormSchema).and(
  z.object({
    name: z.string().trim().min(1, "Введите название варианта"),
  }),
);

export type CalculationPostResponse = z.infer<typeof calculationPostRequest>;
