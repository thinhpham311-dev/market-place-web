import { IVoucherState } from "@/features/voucher/list/interfaces";

export const initialState: IVoucherState = {
  loading: false,
  error: null,
  list: [],
  total: 0,
  status: "idle",
};
