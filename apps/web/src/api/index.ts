import {
  calculationResponseSchema,
  variantResponseSchema,
  variantsResponseSchema,
  type CalculationRequest,
  type CalculationResponse,
  type CreateVariantRequest,
  type VariantResponse,
  type VariantsResponse,
} from "@counterflow/contracts";

export const calculateVariant = async (
  data: CalculationRequest,
): Promise<CalculationResponse> => {
  const response = await fetch("/api/calculation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const rawData: unknown = await response.json();
  const parsedResult = calculationResponseSchema.safeParse(rawData);

  if (!parsedResult.success) {
    throw new Error("Сервер вернул некорректные данные расчёта");
  }

  return parsedResult.data;
};

export const saveVariant = async (
  data: CreateVariantRequest,
): Promise<VariantResponse> => {
  const response = await fetch("/api/variants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
  }

  const rawData: unknown = await response.json();
  return variantResponseSchema.parse(rawData);
};

export const getVariants = async (): Promise<VariantsResponse> => {
  const response = await fetch("/api/variants", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
  }

  const rawData: unknown = await response.json();
  return variantsResponseSchema.parse(rawData);
};

export const getVariantById = async (id: string): Promise<VariantResponse> => {
  const response = await fetch(`/api/variants/${id}`, {
    method: "GET",
  });

  if (response.status === 404) {
    throw new Error("Вариант не найден");
  }

  if (!response.ok) {
    throw new Error("Не удалось загрузить вариант. Попробуйте позже");
  }

  const rawData: unknown = await response.json();

  return variantResponseSchema.parse(rawData);
};
