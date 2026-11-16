import { useCalculationPoints } from "@/stores/calculationStore.ts";
import { CalculationResults } from "@/components/calculation/CalculationResults";
import { CalculationSectionEmpty } from "@/components/calculation/CalculationSectionEmpty";
import { CalculationLoading } from "@/components/calculation/CalculationLoading";
import { CalculationError } from "@/components/calculation/CalculationError";

export const CalculationContent = () => {
  const status = useCalculationPoints((f) => f.status);

  if (status === "idle") return <CalculationSectionEmpty />;

  if (status === "loading") return <CalculationLoading />;

  if (status === "error") return <CalculationError />;

  if (status === "success") return <CalculationResults />;

  return null;
};
