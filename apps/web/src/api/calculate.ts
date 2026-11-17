import {
  CalculationRequest,
  CalculationResponse,
  calculationResponseSchema,
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
