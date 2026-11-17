import { router } from "@/router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "@/components/ui/toast.tsx";
import { useAuthStore } from "@/stores/auth.ts";
import { useEffect } from "react";

export const App = () => {
  const loadCurrentUser = useAuthStore((s) => s.loadCurrentUser);

  useEffect(() => {
    if (useAuthStore.getState().status === "idle") {
      void loadCurrentUser();
    }
  }, [loadCurrentUser]);

  return (
    <Toaster>
      <RouterProvider router={router} />
    </Toaster>
  );
};
