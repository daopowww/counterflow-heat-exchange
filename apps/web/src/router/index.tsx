import { createBrowserRouter } from "react-router";
import { CalculationPage } from "@/pages/calculation-page/CalculationPage";
import { VariantsPage } from "@/pages/VariantsPage";
import { getStorageData } from "@/lib/utils.ts";
import { calculationLocalStorage } from "@/schemas";
import { useCalculationPoints } from "@/stores/calculationStore.ts";
import { CalculationPageSkeleton } from "@/pages/calculation-page/CalculationPageSkeleton";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CalculationPage />,
    loader: async () => {
      try {
        const { runCalculationPoints } = useCalculationPoints.getState();

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
    element: <VariantsPage />,
  },
]);
