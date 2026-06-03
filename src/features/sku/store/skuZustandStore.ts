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
