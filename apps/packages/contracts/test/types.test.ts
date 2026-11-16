// Проверяем публичные .d.ts пакета, а не исходники схем.
import type {
  CalculationRequest,
  CalculationPoint,
  CalculationSummary,
  CalculationResponse,
  CreateVariantRequest,
  Variant,
  VariantResponse,
  VariantsResponse,
} from "@counterflow/contracts";

type IsAny<T> = 0 extends 1 & T ? true : false;
type Assert<T extends true> = T;

type PublicTypesAreNotAny = [
  Assert<IsAny<CalculationRequest> extends false ? true : false>,
  Assert<IsAny<CalculationPoint> extends false ? true : false>,
  Assert<IsAny<CalculationSummary> extends false ? true : false>,
  Assert<IsAny<CalculationResponse> extends false ? true : false>,
  Assert<IsAny<CreateVariantRequest> extends false ? true : false>,
  Assert<IsAny<Variant> extends false ? true : false>,
  Assert<IsAny<VariantResponse> extends false ? true : false>,
  Assert<IsAny<VariantsResponse> extends false ? true : false>,
];

type VariantFieldsAreTyped = [
  Assert<Variant["id"] extends number ? true : false>,
  Assert<Variant["name"] extends string ? true : false>,
  Assert<Variant["createdAt"] extends string ? true : false>,
  Assert<Variant["bedHeight"] extends number ? true : false>,
  Assert<
    CalculationResponse["points"] extends CalculationPoint[] ? true : false
  >,
  Assert<VariantResponse["variant"] extends Variant ? true : false>,
  Assert<VariantsResponse["variants"] extends Variant[] ? true : false>,
];

declare const variant: Variant;

// Эти строки обязаны давать ошибку. При утечке any проверка упадёт.
// @ts-expect-error ID из API должен быть числом.
const invalidId: Variant["id"] = "1";
// @ts-expect-error Дата в JSON должна быть строкой.
const invalidDate: Variant["createdAt"] = new Date();
// @ts-expect-error Произвольного поля в варианте нет.
variant.nonexistentField;
