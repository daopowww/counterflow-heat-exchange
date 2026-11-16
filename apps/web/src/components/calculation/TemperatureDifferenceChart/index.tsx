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
  temperatureDifference: {
    label: "Разность температур",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const TemperatureDifferenceChart = () => {
  const calculationPoints = useCalculationPoints((f) => f.calculationPoints);

  return (
    <Card className="flex-1">
      <CardHeader className="text-xl font-medium">
        Разность температур
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
              padding={{ left: 12, right: 12 }}
              allowDecimals={false}
              tickFormatter={(value) => value.toFixed(1)}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              padding={{ top: 12 }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => (
                    <label>Глубина {label.toFixed(1)}</label>
                  )}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="temperatureDifference"
              type="natural"
              stroke="var(--chart-2)"
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
