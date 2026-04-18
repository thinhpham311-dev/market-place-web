import { ISkuState } from "@/features/sku/interfaces";

export const initialState: ISkuState = {
  loading: false,
  sku: null,
  status: "idle",
  error: null,
};
