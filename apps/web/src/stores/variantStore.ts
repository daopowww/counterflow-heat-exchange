import { Variant } from "@counterflow/contracts";
import { create } from "zustand";
import { getVariants } from "@/api";

interface Store {
  variants: Variant[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

interface Actions {
  resetVariants: () => void;
  loadVariants: () => Promise<void>;
  setVariantError: (error: unknown) => void;
}

export const useVariantStore = create<Store & Actions>()((set) => ({
  variants: [],
  status: "idle",
  error: null,
  resetVariants: () => {
    set({ variants: [], status: "idle", error: null });
  },
  setVariantError: (error: unknown) => {
    set({
      error:
        error instanceof Error ? error.message : "Извините произошла ошибка",
      status: "error",
      variants: [],
    });
  },
  loadVariants: async () => {
    set({ status: "loading", error: null });

    try {
      const response = await getVariants();
      set({ status: "success", error: null, variants: response.variants });
    } catch (error) {
      set({
        status: "error",
        error:
          error instanceof Error ? error.message : "Извините произошла ошибка",
        variants: [],
      });
      throw error;
    }
  },
}));
