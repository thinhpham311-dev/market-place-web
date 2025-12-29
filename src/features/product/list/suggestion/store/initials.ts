import { IProductState } from "@/features/product/list/suggestion/interfaces";

export const initialState: IProductState = {
  loading: false,
  list: [],
  total: 0,
  error: null,
};
