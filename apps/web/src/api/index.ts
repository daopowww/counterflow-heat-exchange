import { FormValues } from "@/components/calculation/CalculationParametersForm";
import { calculationResponse } from "@/schemas";

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
