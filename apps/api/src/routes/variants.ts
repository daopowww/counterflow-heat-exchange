import { prisma } from "../lib/prisma.js";
import { calculationVariantInputSchema } from "../schemas/index.js";
import z from "zod";
import express from "express";

export const variantsRouter = express.Router();

variantsRouter.get("/", async (request, response) => {
  const variants = await prisma.calculationVariant.findMany();

  return response.json({ variants });
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

  const variant = await prisma.calculationVariant.findUnique({ where: { id: parseId.data } });

  if (!variant) return response.status(404).json({ error: "Вариант не найден" });

  return response.status(200).json({ variant });
});

variantsRouter.post("/", async (request, response) => {
  const parseResult = calculationVariantInputSchema.safeParse(request.body);

  if (!parseResult.success) {
    return response.status(400).json({ errors: parseResult.error.issues });
  }

  const variant = await prisma.calculationVariant.create({
    data: parseResult.data,
  });

  return response.status(201).json({ variant });
});
