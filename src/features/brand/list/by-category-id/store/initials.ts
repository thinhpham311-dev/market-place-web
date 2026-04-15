import { IBrandState } from "@/features/brand/list/by-category-id/interfaces";

export const initialState: IBrandState = {
  loading: false,
  list: [],
  total: 0,
  error: null,
  status: "idle",
};
