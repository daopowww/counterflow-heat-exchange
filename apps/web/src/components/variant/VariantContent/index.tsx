import { useVariantStore } from "@/stores/variantStore.ts";
import { VariantsResult } from "@/components/variant/VariantsResult";
import { VariantsSectionEmpty } from "@/components/variant/VariantSectionEmpty";

export const VariantContent = () => {
  const status = useVariantStore((s) => s.status);
  const variants = useVariantStore((s) => s.variants);

  if (status === "loading") return <div>Загрузка данных</div>;

  if (status === "error") return <div>Произошла ошибка</div>;

  if (status === "success" && variants.length === 0)
    return <VariantsSectionEmpty />;

  if (status === "success") return <VariantsResult />;

  return null;
};
