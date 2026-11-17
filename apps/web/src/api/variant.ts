import {
  CreateVariantRequest,
  VariantResponse,
  variantResponseSchema,
  VariantsResponse,
  variantsResponseSchema,
} from "@counterflow/contracts";

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
