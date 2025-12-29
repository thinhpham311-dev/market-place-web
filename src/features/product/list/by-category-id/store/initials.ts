import { IProductState } from "@/features/product/list/by-category-id/interfaces";

export const initialState: IProductState = {
  loading: false,
  list: [],
  total: 0,
  error: null,
};
