import { useState } from "react";
import { logoutUser } from "@/api";
import { toast } from "@/components/ui/toast.tsx";
import { useAuthStore } from "@/stores/auth.ts";
import { useVariantStore } from "@/stores/variantStore.ts";
import { useCalculationPoints } from "@/stores/calculationStore.ts";

export const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const resetVariants = useVariantStore((state) => state.resetVariants);
  const resetCalculation = useCalculationPoints(
    (state) => state.resetCalculation,
  );

  const logout = async (): Promise<boolean> => {
    if (isLoggingOut) return false;

    setIsLoggingOut(true);

    try {
      await logoutUser();

      setUser(null);
      resetVariants();
      resetCalculation();

      toast.add({ type: "success", description: "Вы вышли из аккаунта." });
      return true;
    } catch (error) {
      toast.add({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : "Не удалось выйти из аккаунта. Попробуйте ещё раз.",
      });
      return false;
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut };
};
