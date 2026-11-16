import { useVariantStore } from "@/stores/variantStore.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { NavLink } from "react-router";

export const VariantsResult = () => {
  const variants = useVariantStore((s) => s.variants);

  return (
    <section>
      <ul className="grid grid-cols-4 gap-8">
        {variants.map((variant) => (
          <li key={variant.id}>
            <NavLink to={`/calculate/${variant.id}`}>
              <Card className="hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle>{variant.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Создан{" "}
                    {new Date(variant.createdAt).toLocaleDateString("ru-RU")}
                  </p>
                </CardHeader>

                <CardContent className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Высота слоя</p>
                    <p className="text-lg font-medium tabular-nums">
                      {variant.bedHeight} м
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Диаметр аппарата
                    </p>
                    <p className="text-lg font-medium tabular-nums">
                      {variant.apparatusDiameter} м
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Материал на входе
                    </p>
                    <p className="text-lg font-medium tabular-nums">
                      {variant.materialInletTemp} °C
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Газ на входе
                    </p>
                    <p className="text-lg font-medium tabular-nums">
                      {variant.gasInletTemp} °C
                    </p>
                  </div>
                </CardContent>
              </Card>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};
