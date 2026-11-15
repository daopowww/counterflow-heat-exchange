import { create } from "zustand";
import z from "zod";
import {
  calculationFormSchema,
  CalculationPoint,
  CalculationSummary,
} from "@/schemas";
import { calculateVariant } from "@/api";

interface State {
  calculationPoints: CalculationPoint[];
  status: "idle" | "loading" | "error" | "success";
  summary: CalculationSummary | null;
}

interface Action {
  runCalculationPoints: (
    params: z.output<typeof calculationFormSchema>,
  ) => Promise<void>;
}

export const useCalculationPoints = create<State & Action>()((set) => ({
  calculationPoints: [],
  status: "idle",
  summary: null,
  runCalculationPoints: async (params) => {
    set({ status: "loading" });

    try {
      const data = await calculateVariant(params);
      set({
        calculationPoints: data.points,
        summary: data.summary,
        status: "success",
      });
    } catch (err) {
      console.error(err);
      set({ calculationPoints: [], status: "error", summary: null });
    }
  },
}));
