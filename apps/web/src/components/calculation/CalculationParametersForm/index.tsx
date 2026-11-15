import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import { calculationFormSchema, calculationLocalStorage } from "@/schemas";
import { useCalculationPoints } from "@/stores/calculationStore.ts";
import { getStorageData, setStorageData } from "@/lib/utils.ts";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast.tsx";

export type FormValues = z.infer<typeof calculationFormSchema>;

const defaultValues: z.input<typeof calculationFormSchema> = {
  apparatusDiameter: "",
  gasInletTemp: "",
  gasVelocity: "",
  gasVolumetricHeatCapacity: "",
  intervalCount: "",
  materialInletTemp: "",
  materialMassFlow: "",
  materialSpecificHeatCapacity: "",
  volumetricHeatTransferCoefficient: "",
  bedHeight: "",
};

export const CalculationParametersForm = () => {
  const runCalculationPoints = useCalculationPoints(
    (s) => s.runCalculationPoints,
  );
  const status = useCalculationPoints((s) => s.status);
  const setCalculationInputs = useCalculationPoints(
    (s) => s.setCalculationInputs,
  );

  const { handleSubmit, control, reset } = useForm<
    z.input<typeof calculationFormSchema>,
    unknown,
    z.output<typeof calculationFormSchema>
  >({
    resolver: zodResolver(calculationFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const formData = getStorageData("form-data", calculationLocalStorage, null);

    if (formData === null) return;

    const parsedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, String(value)]),
    );

    reset(parsedFormData);
  }, [reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await runCalculationPoints(data);
      toast.add({
        type: "success",
        description: "Расчёт выполнен.",
      });
    } catch (error) {
      toast.add({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : "Не удалось выполнить расчёт.",
      });
    }
  };

  return (
    <form
      className="grid flex-1 gap-5 overflow-y-auto p-5"
      id="form-calculation-parameters"
      onSubmit={handleSubmit(onSubmit)}
      onReset={(event) => {
        event.preventDefault();
        reset(defaultValues);
        localStorage.removeItem("form-data");
      }}
    >
      <Controller
        name="bedHeight"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel className="text-foreground" htmlFor="form-bed-height">
              Высота слоя, м
            </FieldLabel>
            <Input
              {...field}
              className="h-9"
              id="form-bed-height"
              placeholder="Например, 6"
              aria-invalid={fieldState.invalid}
              type="number"
            />
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="apparatusDiameter"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel
              className="text-foreground"
              htmlFor="form-apparatus-diameter"
            >
              Диаметр аппарата, м
            </FieldLabel>
            <Input
              {...field}
              className="h-9"
              id="form-apparatus-diameter"
              aria-invalid={fieldState.invalid}
              placeholder="Например, 2,2"
              type="number"
            />
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="materialInletTemp"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel
              className="text-foreground"
              htmlFor="form-material-inlet-temp"
            >
              Температура материала на входе, °C
            </FieldLabel>
            <Input
              {...field}
              className="h-9"
              id="form-material-inlet-temp"
              placeholder="Например, 15"
              aria-invalid={fieldState.invalid}
              type="number"
            />
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="materialMassFlow"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel
              className="text-foreground"
              htmlFor="form-material-mass-flow"
            >
              Массовый расход материала, кг/с
            </FieldLabel>
            <Input
              {...field}
              className="h-9"
              id="form-material-mass-flow"
              placeholder="Например, 1,68"
              aria-invalid={fieldState.invalid}
              type="number"
            />
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="materialSpecificHeatCapacity"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel
              className="text-foreground"
              htmlFor="form-material-specific-heat-capacity"
            >
              Удельная теплоёмкость материала, кДж/(кг·К)
            </FieldLabel>
            <Input
              {...field}
              className="h-9"
              id="form-material-specific-heat-capacity"
              placeholder="Например, 1,49"
              aria-invalid={fieldState.invalid}
              type="number"
            />
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="gasInletTemp"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel
              className="text-foreground"
              htmlFor="form-gas-inlet-temp"
            >
              Температура газа на входе, °C
            </FieldLabel>
            <Input
              {...field}
              className="h-9"
              id="form-gas-inlet-temp"
              placeholder="Например, 600"
              aria-invalid={fieldState.invalid}
              type="number"
            />
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="gasVelocity"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel className="text-foreground" htmlFor="form-gas-velocity">
              Скорость газа, м/с
            </FieldLabel>
            <Input
              {...field}
              className="h-9"
              id="form-gas-velocity"
              placeholder="Например, 0,73"
              aria-invalid={fieldState.invalid}
              type="number"
            />
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="gasVolumetricHeatCapacity"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel
              className="text-foreground"
              htmlFor="form-gas-volumetric-heat-capacity"
            >
              Объёмная теплоёмкость газа, кДж/(м³·К)
            </FieldLabel>
            <Input
              {...field}
              className="h-9"
              id="form-gas-volumetric-heat-capacity"
              placeholder="Например, 1,09"
              aria-invalid={fieldState.invalid}
              type="number"
            />
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="volumetricHeatTransferCoefficient"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel
              className="text-foreground"
              htmlFor="form-volumetric-heat-transfer-coefficient"
            >
              Объёмный коэффициент теплоотдачи, Вт/(м³·К)
            </FieldLabel>
            <Input
              {...field}
              className="h-9"
              id="form-volumetric-heat-transfer-coefficient"
              placeholder="Например, 2440"
              aria-invalid={fieldState.invalid}
              type="number"
            />
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="intervalCount"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel
              className="text-foreground"
              htmlFor="form-interval-count"
            >
              Число интервалов по высоте
            </FieldLabel>
            <Input
              {...field}
              className="h-9"
              id="form-interval-count"
              placeholder="Например, 6"
              aria-invalid={fieldState.invalid}
              type="number"
            />
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
    </form>
  );
};
