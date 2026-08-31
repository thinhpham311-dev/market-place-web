import { IProductState } from "@/features/product/list/by-shop-id/interfaces";

export const initialState: IProductState = {
  loading: false,
  list: [],
  total: 0,
  page: 1,
  limit: 20,
  error: null,
  status: "idle",
};
