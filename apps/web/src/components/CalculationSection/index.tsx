import { ResultCard } from "@/components/ResultCard";
import { MaterialOutletIcon } from "@/components/icons/MaterialOutletIcon";
import { GasOutletIcon } from "@/components/icons/GasOutletIcon";
import { HeatFlowIcon } from "@/components/icons/HeatFlowIcon";
import { TemperatureProfileTable } from "@/components/TemperatureProfileTable";
import { TemperatureProfileChart } from "@/components/TemperatureProfileChart";
import { TemperatureDifferenceChart } from "@/components/TemperatureDifferenceChart";

export const CalculationSection = () => {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex gap-3">
        <ResultCard
          title="Материал на выходе"
          value="598 °C"
          icon={<MaterialOutletIcon className="size-8" />}
        />
        <ResultCard title="Газ на выходе" value="630" icon={<GasOutletIcon className="size-5" />} />
        <ResultCard title="Тепловой поток" value="630" icon={<HeatFlowIcon className="size-8" />} />
      </div>
      <div className="flex gap-8">
        <TemperatureProfileChart />
        <TemperatureDifferenceChart />
      </div>
      <TemperatureProfileTable />
    </section>
  );
};
