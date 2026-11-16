import { useVariantStore } from "@/stores/variantStore.ts";
import { VariantsResult } from "@/components/variant/VariantsResult";

export const VariantContent = () => {
  const status = useVariantStore((s) => s.status);

  if (status === "loading") return <div>Загрузка данных</div>;

  if (status === "error") return <div>Произошла ошибка</div>;

  if (status === "idle")
    return <div>Здесь появятся ваши сохранённые варианты</div>;

  if (status === "success") return <VariantsResult />;

  return null;
};
