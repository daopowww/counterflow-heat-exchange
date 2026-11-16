import { useCalculationPoints } from "@/stores/calculationStore.ts";

export const CalculationError = () => {
  const error = useCalculationPoints((state) => state.error);

  return <p role="alert">{error ?? "Не удалось выполнить расчёт"}</p>;
};
