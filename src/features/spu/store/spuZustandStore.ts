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
