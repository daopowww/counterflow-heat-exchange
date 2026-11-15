import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Save } from "lucide-react";
import { useCalculationPoints } from "@/stores/calculationStore.ts";
import { SaveVariantForm } from "@/components/variant/SaveVariantForm";
import { useState } from "react";

export const SaveVariantSheet = () => {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const calculationInputs = useCalculationPoints((s) => s.calculationInputs);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button size="lg" disabled={calculationInputs === null}>
            Сохранить вариант
          </Button>
        }
      />
      <SheetContent className="gap-3 overflow-hidden data-[side=right]:w-full data-[side=right]:sm:max-w-md">
        <SheetHeader className="shrink-0 gap-1 border-b px-5 py-4 pr-12">
          <SheetTitle>Сохранить вариант</SheetTitle>
          <SheetDescription>
            Сохраните последний удачный расчёт
          </SheetDescription>
        </SheetHeader>
        <SaveVariantForm
          onSave={() => setOpen(false)}
          onSavingChange={(state) => setIsSaving(state)}
        />
        {calculationInputs && (
          <section className="px-5">
            <h3 className="mb-3 font-medium">Параметры расчёта</h3>
            <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 text-sm">
              <dt>Высота слоя</dt>
              <dd>{calculationInputs.bedHeight} м</dd>
              <dt>Диаметр аппарата</dt>
              <dd>{calculationInputs.apparatusDiameter} м</dd>
              <dt>Температура материала на входе</dt>
              <dd>{calculationInputs.materialInletTemp} °C</dd>
              <dt>Массовый расход материала</dt>
              <dd>{calculationInputs.materialMassFlow} кг/с</dd>
              <dt>Удельная теплоёмкость материала</dt>
              <dd>
                {calculationInputs.materialSpecificHeatCapacity} кДж/(кг·К)
              </dd>
              <dt>Температура газа на входе</dt>
              <dd>{calculationInputs.gasInletTemp} °C</dd>
              <dt>Скорость газа</dt>
              <dd>{calculationInputs.gasVelocity} м/с</dd>
              <dt>Объёмная теплоёмкость газа</dt>
              <dd>{calculationInputs.gasVolumetricHeatCapacity} кДж/(м³·К)</dd>
              <dt>Объёмный коэффициент теплоотдачи</dt>
              <dd>
                {calculationInputs.volumetricHeatTransferCoefficient} Вт/(м³·К)
              </dd>
              <dt>Число интервалов по высоте</dt>
              <dd>{calculationInputs.intervalCount}</dd>
            </dl>
          </section>
        )}
        <SheetFooter className="shrink-0 border-t px-5 py-4">
          <Button
            type="submit"
            form="form-save-variant"
            size="lg"
            disabled={isSaving}
          >
            <Save />
            <span>Сохранить</span>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
