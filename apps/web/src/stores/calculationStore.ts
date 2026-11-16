import { create } from "zustand";
import {
  calculationRequestSchema,
  type CalculationRequest,
  type CalculationPoint,
  type CalculationSummary,
} from "@counterflow/contracts";
import { calculateVariant, getVariantById } from "@/api";
import { setStorageData } from "@/lib/utils.ts";

interface State {
  calculationPoints: CalculationPoint[];
  status: "idle" | "loading" | "error" | "success";
  summary: CalculationSummary | null;
  calculationInputs: CalculationRequest | null;
  error: string | null;
}

interface Action {
  runCalculationPoints: (params: CalculationRequest) => Promise<void>;
  setCalculationInputs: (inputs: CalculationRequest) => void;
  setCalculationError: (error: unknown) => void;
  loadSavedVariant: (id: string) => Promise<void>;
}

export const useCalculationPoints = create<State & Action>()((set, get) => ({
  calculationPoints: [],
  status: "idle",
  summary: null,
  calculationInputs: null,
  error: null,
  loadSavedVariant: async (id: string) => {
    set({
      status: "loading",
      error: null,
      calculationPoints: [],
      calculationInputs: null,
      summary: null,
    });

    try {
      const response = await getVariantById(id);
      const inputs = calculationRequestSchema.parse(response.variant);
      await get().runCalculationPoints(inputs);
    } catch (error) {
      get().setCalculationError(error);
      throw error;
    }
  },
  setCalculationError: (error: unknown) => {
    set({
      calculationPoints: [],
      status: "error",
      summary: null,
      calculationInputs: null,
      error:
        error instanceof Error ? error.message : "Не удалось загрузить расчёт",
    });
  },
  setCalculationInputs: (inputs: CalculationRequest) => {
    set({ calculationInputs: inputs });
  },
  runCalculationPoints: async (params) => {
    set({
      status: "loading",
      error: null,
      calculationPoints: [],
      calculationInputs: null,
      summary: null,
    });

    try {
      const data = await calculateVariant(params);
      set({
        calculationPoints: data.points,
        calculationInputs: params,
        summary: data.summary,
        status: "success",
      });
      setStorageData("form-data", params, calculationRequestSchema);
    } catch (error) {
      set({
        calculationPoints: [],
        status: "error",
        summary: null,
        error:
          error instanceof Error
            ? error.message
            : "Не удалось загрузить расчёт",
      });
      throw error;
    }
  },
}));
