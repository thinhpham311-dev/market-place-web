import { IVoucherProductsState } from "../interfaces";

export const initialState: IVoucherProductsState = {
  loading: false,
  error: null,
  data: null,
  total: 0,
  status: "idle",
};
