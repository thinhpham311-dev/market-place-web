import { create } from "zustand";
import { ISkuModel } from "@/models/sku";

export interface ISkuState {
  sku: ISkuModel | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "success" | "error" | "";
  setSkuData: (data: Partial<Omit<ISkuState, "setSkuData">>) => void;
}

export const useSkuStore = create<ISkuState>((set) => ({
  sku: null,
  loading: false,
  error: null,
  status: "",
  setSkuData: (data) => set(data),
}));

export const selectSku = (state: ISkuState) => state.sku;
export const selectSkuLoading = (state: ISkuState) => state.loading;
export const selectSkuError = (state: ISkuState) => state.error;
export const selectSkuStatus = (state: ISkuState) => state.status;
