import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { useCalculationPoints } from "@/stores/calculationStore.ts";

export const TemperatureProfileTable = () => {
  const calculationPoints = useCalculationPoints((f) => f.calculationPoints);

  if (calculationPoints === null) {
    return <p>Введите параметры и выполните расчёт.</p>;
  }

  return (
    <Card>
      <CardContent>
        <Table className="text-base">
          <TableCaption className="caption-top m-0 mb-1.5 text-base">
            Результаты по высоте слоя
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Высота, м</TableHead>
              <TableHead>Материал, °C</TableHead>
              <TableHead>Газ, °C</TableHead>
              <TableHead>Разность, °C</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calculationPoints?.map((point) => (
              <TableRow key={point.depth}>
                <TableCell>{point.depth}</TableCell>
                <TableCell>{point.materialTemperature.toFixed(2)}</TableCell>
                <TableCell>{point.gasTemperature.toFixed(2)}</TableCell>
                <TableCell>{point.temperatureDifference.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
