import { create } from "zustand";
import { AuthUser } from "@counterflow/contracts";
import { getCurrentUser } from "@/api";

interface State {
  user: AuthUser | null;
  status: "idle" | "success" | "loading" | "error";
  error: string | null;
}

interface Action {
  loadCurrentUser: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<State & Action>()((set) => ({
  user: null,
  error: null,
  status: "idle",
  setUser: (user: AuthUser | null) =>
    set({ user, error: null, status: "success" }),
  loadCurrentUser: async () => {
    set({ status: "loading", error: null });
    try {
      const { user } = await getCurrentUser();
      set({ status: "success", error: null, user });
    } catch (e) {
      set({
        status: "error",
        error: e instanceof Error ? e.message : "Ошибка запроса пользователя",
      });
    }
  },
}));
