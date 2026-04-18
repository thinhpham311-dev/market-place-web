import { IVoucherModel } from "@/models/discount";
import { IFilter } from "@/types/common";

export type IVouchersListRequest = IFilter;

export interface IVouchersListResponse {
  metadata: {
    list: IVoucherModel[];
    total: number;
  };
}

export interface IVoucherState {
  loading: boolean;
  error: string | null;
  list: IVoucherModel[];
  total: number;
  status: "idle" | "loading" | "success" | "error";
}
