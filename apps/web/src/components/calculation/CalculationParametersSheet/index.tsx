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
import { CalculationParametersForm } from "@/components/calculation/CalculationParametersForm";
import { Calculator } from "lucide-react";
import { useCalculationPoints } from "@/stores/calculationStore.ts";
import { Spinner } from "@/components/ui/spinner.tsx";

export const CalculationParametersSheet = () => {
  const status = useCalculationPoints((s) => s.status);
  const calculationInputs = useCalculationPoints((s) => s.calculationInputs);

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="lg">
            Исходные данные
          </Button>
        }
      />
      <SheetContent className="gap-0 overflow-hidden data-[side=right]:w-full data-[side=right]:sm:max-w-md">
        <SheetHeader className="shrink-0 gap-1 border-b px-5 py-4 pr-12">
          <SheetTitle>Исходные данные</SheetTitle>
          <SheetDescription>Напишите исходные данные</SheetDescription>
        </SheetHeader>
        <CalculationParametersForm />
        <SheetFooter className="shrink-0 border-t px-5 py-4">
          <Button
            type="submit"
            form="form-calculation-parameters"
            size="lg"
            disabled={status === "loading"}
          >
            <Calculator />
            {status === "loading" ? (
              <div className="flex flex-row gap-2 items-center">
                <span>Считаем...</span>
                <Spinner />
              </div>
            ) : (
              <span>Рассчитать</span>
            )}
          </Button>
          <Button
            type="reset"
            variant="outline"
            form="form-calculation-parameters"
            size="lg"
            disabled={status === "loading"}
          >
            Сбросить
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
