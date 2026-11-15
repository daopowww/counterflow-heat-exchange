import { ResultCard } from "@/components/calculation/ResultCard";
import { MaterialOutletIcon } from "@/components/icons/MaterialOutletIcon";
import { GasOutletIcon } from "@/components/icons/GasOutletIcon";
import { HeatFlowIcon } from "@/components/icons/HeatFlowIcon";
import { TemperatureProfileTable } from "@/components/calculation/TemperatureProfileTable";
import { TemperatureProfileChart } from "@/components/calculation/TemperatureProfileChart";
import { TemperatureDifferenceChart } from "@/components/calculation/TemperatureDifferenceChart";
import { useCalculationPoints } from "@/stores/calculationStore.ts";

export const CalculationResults = () => {
  const summary = useCalculationPoints((f) => f.summary);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex gap-3">
        <ResultCard
          title="Материал на выходе"
          value={`${summary?.materialOutletTemperature.toFixed(2) ?? ""} °C`}
          icon={<MaterialOutletIcon className="size-8" />}
        />
        <ResultCard
          title="Газ на выходе"
          value={String(summary?.gasOutletTemperature.toFixed(2) ?? "")}
          icon={<GasOutletIcon className="size-5" />}
        />
        <ResultCard
          title="Тепловой поток"
          value={String(summary?.heatFlowKw.toFixed(2) ?? "")}
          icon={<HeatFlowIcon className="size-8" />}
        />
      </div>
      <div className="flex gap-8">
        <TemperatureProfileChart />
        <TemperatureDifferenceChart />
      </div>
      <TemperatureProfileTable />
    </section>
  );
};
