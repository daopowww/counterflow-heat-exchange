import assert from "node:assert/strict";
import test from "node:test";
import {
  calculationRequestSchema,
  calculationResponseSchema,
  createVariantRequestSchema,
  variantSchema,
  variantResponseSchema,
  variantsResponseSchema,
} from "@counterflow/contracts";

const input = {
  bedHeight: 6,
  materialInletTemp: 15,
  gasVelocity: 0.73,
  gasVolumetricHeatCapacity: 1.09,
  materialMassFlow: 1.68,
  gasInletTemp: 600,
  materialSpecificHeatCapacity: 1.49,
  volumetricHeatTransferCoefficient: 2440,
  apparatusDiameter: 2.2,
  intervalCount: 60,
};

test("запрос расчёта принимает числа и отклоняет строки и неверные ограничения", () => {
  assert.deepEqual(calculationRequestSchema.parse(input), input);
  for (const invalid of [
    { ...input, bedHeight: "6" },
    { ...input, bedHeight: 0 },
    { ...input, intervalCount: 1.5 },
    { ...input, gasVelocity: undefined },
  ]) {
    assert.equal(calculationRequestSchema.safeParse(invalid).success, false);
  }
});

test("создание варианта требует название, но не требует ID и даты", () => {
  const result = createVariantRequestSchema.parse({
    ...input,
    name: "  Вариант 1  ",
  });
  assert.equal(result.name, "Вариант 1");
  assert.equal("id" in result, false);
  assert.equal(
    createVariantRequestSchema.safeParse({ ...input, name: "   " }).success,
    false,
  );
});

const variant = {
  ...input,
  name: "Вариант 1",
  id: 1,
  createdAt: "2026-11-16T10:00:00.000Z",
};

test("сохранённый вариант требует ID и дату в формате JSON", () => {
  const json = JSON.parse(
    JSON.stringify({ ...variant, createdAt: new Date(variant.createdAt) }),
  );
  assert.deepEqual(variantSchema.parse(json), variant);
  for (const invalid of [
    { ...variant, id: undefined },
    { ...variant, createdAt: undefined },
    { ...variant, createdAt: "вчера" },
    { ...variant, createdAt: new Date(variant.createdAt) },
  ]) {
    assert.equal(variantSchema.safeParse(invalid).success, false);
  }
});

test("ответы вариантов проверяют обёртку, список и каждую запись", () => {
  assert.deepEqual(variantResponseSchema.parse({ variant }), { variant });
  assert.deepEqual(variantsResponseSchema.parse({ variants: [variant] }), {
    variants: [variant],
  });
  assert.deepEqual(variantsResponseSchema.parse({ variants: [] }), {
    variants: [],
  });
  assert.equal(variantResponseSchema.safeParse(variant).success, false);
  assert.equal(
    variantsResponseSchema.safeParse({ variants: [input] }).success,
    false,
  );
});

test("ответ расчёта сохраняет точки и итоги и отклоняет неконечные числа", () => {
  const response = {
    points: [
      {
        depth: 0,
        materialTemperature: 15,
        gasTemperature: 118,
        temperatureDifference: 103,
      },
    ],
    summary: {
      materialOutletTemperature: 598,
      gasOutletTemperature: 118,
      heatFlowKw: 1459,
    },
  };
  assert.deepEqual(calculationResponseSchema.parse(response), response);
  assert.equal(
    calculationResponseSchema.safeParse({
      ...response,
      summary: { ...response.summary, heatFlowKw: NaN },
    }).success,
    false,
  );
  assert.equal(
    calculationResponseSchema.safeParse({
      ...response,
      summary: { ...response.summary, heatFlowKw: Infinity },
    }).success,
    false,
  );
});
