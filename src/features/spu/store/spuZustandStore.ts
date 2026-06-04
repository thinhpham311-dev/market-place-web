import { create } from "zustand";
import { ISpuModel } from "@/models/spu";

export interface ISpuState {
  spu: ISpuModel | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "success" | "error" | "";
  setSpuData: (data: Partial<Omit<ISpuState, "setSpuData">>) => void;
}

export const useSpuStore = create<ISpuState>((set) => ({
  spu: null,
  loading: false,
  error: null,
  status: "",
  setSpuData: (data) => set(data),
}));

export const selectSpu = (state: ISpuState) => state.spu;
export const selectSpuLoading = (state: ISpuState) => state.loading;
export const selectSpuError = (state: ISpuState) => state.error;
export const selectSpuStatus = (state: ISpuState) => state.status;
