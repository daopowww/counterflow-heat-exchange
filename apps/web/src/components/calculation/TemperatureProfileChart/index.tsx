import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart.tsx";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useCalculationPoints } from "@/stores/calculationStore.ts";

const chartConfig = {
  materialTemperature: {
    label: "Температура материала",
    color: "var(--chart-1)",
  },
  gasTemperature: {
    label: "Температура газа",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const TemperatureProfileChart = () => {
  const calculationPoints = useCalculationPoints((f) => f.calculationPoints);

  return (
    <Card className="flex-1">
      <CardHeader className="text-xl font-medium">
        Температура по высоте слоя
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={calculationPoints}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="depth"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => <label>Глубина {label}</label>}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="materialTemperature"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
            />
            <Line
              dataKey="gasTemperature"
              type="monotone"
              stroke="var(--chart-2)"
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
