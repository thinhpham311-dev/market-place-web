import { ISkuModel } from "@/models/sku";

export interface ISkuRequest extends ISkuModel {
  optionsCount: number;
}

export interface ISkuResponse {
  metadata: ISkuModel;
}

export interface ISkuState {
  loading: boolean;
  error: string | null;
  sku: ISkuModel | null;
  status: "idle" | "loading" | "success" | "error";
}
