import { prisma } from "../lib/prisma.js";
import { createVariantRequestSchema } from "../schemas/index.js";
import type {
  Variant,
  VariantResponse,
  VariantsResponse,
} from "@counterflow/contracts";
import type { CalculationVariant } from "../generated/prisma/client.js";
import z from "zod";
import express from "express";

export const variantsRouter = express.Router();

const serializeVariant = (variant: CalculationVariant): Variant => ({
  ...variant,
  createdAt: variant.createdAt.toISOString(),
});

variantsRouter.get("/", async (request, response) => {
  const variants = await prisma.calculationVariant.findMany();

  const result: VariantsResponse = {
    variants: variants.map(serializeVariant),
  };

  return response.status(200).json(result);
});

variantsRouter.get("/:id", async (request, response) => {
  const parseId = z.coerce
    .number("Параметр должен быть числом")
    .int("Число должно быть целым")
    .positive("Число должно быть положительным")
    .safeParse(request.params.id);

  if (!parseId.success) {
    return response.status(400).json({ errors: parseId.error.issues });
  }

  const variant = await prisma.calculationVariant.findUnique({
    where: { id: parseId.data },
  });

  if (!variant)
    return response.status(404).json({ error: "Вариант не найден" });

  const result: VariantResponse = { variant: serializeVariant(variant) };

  return response.status(200).json(result);
});

variantsRouter.post("/", async (request, response) => {
  const parseResult = createVariantRequestSchema.safeParse(request.body);

  if (!parseResult.success) {
    return response.status(400).json({ errors: parseResult.error.issues });
  }

  const variant = await prisma.calculationVariant.create({
    data: parseResult.data,
  });

  const result: VariantResponse = { variant: serializeVariant(variant) };

  return response.status(201).json(result);
});
