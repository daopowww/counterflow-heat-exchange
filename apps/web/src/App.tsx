import { router } from "@/router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "@/components/ui/toast.tsx";

export const App = () => {
  return (
    <Toaster>
      <RouterProvider router={router} />
    </Toaster>
  );
};
