import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useAuthStore } from "@/stores/auth.ts";

export const VariantsSectionEmpty = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Привет, {user?.login ?? "Пользователь"}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Здесь появятся ваши сохранённые варианты</p>
          <p>
            Для того чтобы начать расчеты, нажмите на кнопку "Исходные данные"
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
