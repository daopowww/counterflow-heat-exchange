import { createBrowserRouter } from "react-router";
import { CalculationPage } from "@/pages/CalculationPage";
import { VariantsPage } from "@/pages/VariantsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CalculationPage />,
  },
  {
    path: "/variants",
    element: <VariantsPage />,
  },
]);
