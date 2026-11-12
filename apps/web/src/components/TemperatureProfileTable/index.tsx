import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { mockCalculationPoints } from "@/data/mockCalculationPoints.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";

export const TemperatureProfileTable = () => {
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
            {mockCalculationPoints.map((point) => (
              <TableRow key={point.depth}>
                <TableCell>{point.depth}</TableCell>
                <TableCell>{point.materialTemperature}</TableCell>
                <TableCell>{point.gasTemperature}</TableCell>
                <TableCell>{point.temperatureDifference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
