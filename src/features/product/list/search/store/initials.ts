import { IProductState } from "@/features/product/list/search/interfaces";

export const initialState: IProductState = {
  loading: false,
  list: [],
  total: 0,
  error: null,
};
