import { ISpuModel } from "@/models/spu";

export type ISpuRequest = {
  product_id: string;
};

export interface ISpuResponse {
  metadata:ISpuModel;
}

export interface ISpuState {
  loading: boolean;
  error: string | null;
  spu: ISpuModel | null;
  status: "idle" | "loading" | "success" | "error";
}
