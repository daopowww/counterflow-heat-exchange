import * as z from "zod";
import { calculationRequestSchema } from "./calculation.js";

export const createVariantRequestSchema = calculationRequestSchema.extend({
  name: z.string().trim().min(1, "Введите название варианта"),
});

export type CreateVariantRequest = z.infer<typeof createVariantRequestSchema>;

export const variantSchema = createVariantRequestSchema.extend({
  id: z.int().positive(),
  createdAt: z.iso.datetime(),
});

export type Variant = z.infer<typeof variantSchema>;

export const variantResponseSchema = z.object({
  variant: variantSchema,
});

export type VariantResponse = z.infer<typeof variantResponseSchema>;

export const variantsResponseSchema = z.object({
  variants: z.array(variantSchema),
});

export type VariantsResponse = z.infer<typeof variantsResponseSchema>;
