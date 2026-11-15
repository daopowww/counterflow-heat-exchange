import { create } from "zustand";
import z from "zod";
import {
  calculationFormSchema,
  CalculationInputs,
  calculationLocalStorage,
  CalculationPoint,
  CalculationSummary,
} from "@/schemas";
import { calculateVariant } from "@/api";
import { setStorageData } from "@/lib/utils.ts";

interface State {
  calculationPoints: CalculationPoint[];
  status: "idle" | "loading" | "error" | "success";
  summary: CalculationSummary | null;
  calculationInputs: CalculationInputs | null;
}

interface Action {
  runCalculationPoints: (
    params: z.output<typeof calculationFormSchema>,
  ) => Promise<void>;
  setCalculationInputs: (inputs: CalculationInputs) => void;
}

export const useCalculationPoints = create<State & Action>()((set) => ({
  calculationPoints: [],
  status: "idle",
  summary: null,
  calculationInputs: null,
  setCalculationInputs: (inputs: CalculationInputs) => {
    set({ calculationInputs: inputs });
  },
  runCalculationPoints: async (params) => {
    set({ status: "loading" });

    try {
      const data = await calculateVariant(params);
      set({
        calculationPoints: data.points,
        calculationInputs: params,
        summary: data.summary,
        status: "success",
      });
      setStorageData("form-data", params, calculationLocalStorage);
    } catch (error) {
      set({ calculationPoints: [], status: "error", summary: null });
      throw error;
    }
  },
}));
