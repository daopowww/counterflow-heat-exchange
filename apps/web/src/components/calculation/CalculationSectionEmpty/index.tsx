import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

export const CalculationSectionEmpty = () => {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Добро пожаловать, Пользователь!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Для того чтобы начать расчеты, нажмите на кнопку "Исходные данные"
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
