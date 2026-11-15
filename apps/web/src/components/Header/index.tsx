import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardTitle } from "@/components/ui/card.tsx";
import { CalculationParametersSheet } from "@/components/calculation/CalculationParametersSheet";

export const Header = () => {
  return (
    <header>
      <Card className="flex flex-row gap-10 items-center justify-between px-4">
        <CardTitle>
          <h1 className="text-3xl font-bold">Привет, Пользователь!</h1>
          <div>
            <p className="text-stone-600">Расчёт теплообмена</p>
          </div>
        </CardTitle>
        <CardContent className="px-0">
          <div className="flex items-center gap-4">
            <CalculationParametersSheet />
            <Button size="lg">Сохранить вариант</Button>
          </div>
        </CardContent>
      </Card>
    </header>
  );
};
