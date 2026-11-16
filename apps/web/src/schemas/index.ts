import z from "zod";
import {
  calculationRequestSchema,
  createVariantRequestSchema,
  type CalculationRequest,
} from "@counterflow/contracts";

const stringToNumber = z
  .string()
  .trim()
  .min(1, "Поле обязательно к заполнению")
  .transform((value) => Number(value));

const fields = calculationRequestSchema.shape;

// Форма принимает строки, затем применяет общие числовые ограничения.
export const calculationFormSchema = z.object({
  bedHeight: stringToNumber.pipe(fields.bedHeight),
  materialInletTemp: stringToNumber.pipe(fields.materialInletTemp),
  gasVelocity: stringToNumber.pipe(fields.gasVelocity),
  gasVolumetricHeatCapacity: stringToNumber.pipe(
    fields.gasVolumetricHeatCapacity,
  ),
  materialMassFlow: stringToNumber.pipe(fields.materialMassFlow),
  gasInletTemp: stringToNumber.pipe(fields.gasInletTemp),
  materialSpecificHeatCapacity: stringToNumber.pipe(
    fields.materialSpecificHeatCapacity,
  ),
  volumetricHeatTransferCoefficient: stringToNumber.pipe(
    fields.volumetricHeatTransferCoefficient,
  ),
  apparatusDiameter: stringToNumber.pipe(fields.apparatusDiameter),
  intervalCount: stringToNumber.pipe(fields.intervalCount),
});

// В storage сохраняются те же числовые параметры, что отправляются в API.
export const calculationLocalStorage = calculationRequestSchema;
export type CalculationLocalStorage = CalculationRequest;

export const variantFormSchema = createVariantRequestSchema.pick({
  name: true,
});
export type VariantFormType = z.infer<typeof variantFormSchema>;
