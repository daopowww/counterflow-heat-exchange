import { Controller, useForm } from "react-hook-form";
import {
  calculationPostRequest,
  variantFormSchema,
  VariantFormType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useCalculationPoints } from "@/stores/calculationStore.ts";
import { saveVariant } from "@/api";
import { toast } from "@/components/ui/toast.tsx";

const defaultValues: VariantFormType = {
  name: "",
};

type SaveVariantFormProps = {
  onSave: () => void;
  onSavingChange: (state: boolean) => void;
};

export const SaveVariantForm = ({
  onSave,
  onSavingChange,
}: SaveVariantFormProps) => {
  const { handleSubmit, control } = useForm<VariantFormType>({
    resolver: zodResolver(variantFormSchema),
    defaultValues,
  });

  const calculationInputs = useCalculationPoints((s) => s.calculationInputs);

  const onSubmit = async (data: VariantFormType) => {
    const parsedData = calculationPostRequest.safeParse({
      name: data.name,
      ...calculationInputs,
    });

    if (!parsedData.success) return;

    onSavingChange(true);

    try {
      const response = await saveVariant(parsedData.data);

      toast.add({
        type: "success",
        description: "Вариант успешно создан.",
      });

      onSave();
    } catch (error) {
      toast.add({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : "Ошибка сохранения варианта.",
      });
    } finally {
      onSavingChange(false);
    }
  };

  return (
    <form
      id="form-save-variant"
      className="px-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel
              className="text-foreground"
              htmlFor="form-save-variant-name"
            >
              Название варианта
            </FieldLabel>
            <Input
              {...field}
              className="h-9"
              id="form-save-variant-name"
              placeholder="Например, вариант №1"
              aria-invalid={fieldState.invalid}
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
