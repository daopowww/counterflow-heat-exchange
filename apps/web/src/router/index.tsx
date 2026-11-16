import { createBrowserRouter, redirect } from "react-router";
import { CalculationPage } from "@/pages/calculation-page/CalculationPage";
import { VariantsPage } from "@/pages/variants-page";
import { getStorageData } from "@/lib/utils.ts";
import { calculationLocalStorage } from "@/schemas";
import { useCalculationPoints } from "@/stores/calculationStore.ts";
import { CalculationPageSkeleton } from "@/pages/calculation-page/CalculationPageSkeleton";
import { useVariantStore } from "@/stores/variantStore.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/calculate"),
  },
  {
    path: "*",
    loader: () => redirect("/"),
  },
  {
    path: "/calculate/:variantId?",
    element: <CalculationPage />,
    loader: async ({ params }) => {
      const id = params.variantId;
      const { runCalculationPoints, loadSavedVariant } =
        useCalculationPoints.getState();

      try {
        if (id) {
          await loadSavedVariant(id);
          return null;
        }
      } catch (e) {
        return null;
      }

      try {
        const storageFormData = getStorageData(
          "form-data",
          calculationLocalStorage,
          null,
        );

        if (storageFormData === null) return;

        await runCalculationPoints(storageFormData);
      } catch (e) {
        return null;
      }
    },
    hydrateFallbackElement: <CalculationPageSkeleton />,
  },
  {
    path: "/variants",
    loader: async () => {
      try {
        const { loadVariants } = useVariantStore.getState();
        await loadVariants();
      } catch (e) {
        return null;
      }
    },
    hydrateFallbackElement: <div>загрузка данных</div>,
    element: <VariantsPage />,
  },
]);
