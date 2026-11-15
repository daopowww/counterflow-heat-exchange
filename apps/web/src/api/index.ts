import { FormValues } from "@/components/calculation/CalculationParametersForm";
import { CalculationPostResponse, calculationResponse } from "@/schemas";

export const calculateVariant = async (data: FormValues) => {
  const response = await fetch("api/calculation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const rawData = await response.json();

  const parsedResult = calculationResponse.safeParse(rawData);

  if (!parsedResult.success) {
    throw new Error("Сервер вернул некорректные данные расчёта");
  }

  return parsedResult.data;
};

export const saveVariant = async (data: CalculationPostResponse) => {
  const response = await fetch("api/variants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
