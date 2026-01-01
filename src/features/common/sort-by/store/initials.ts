import { ISortInitialState, IState } from "@/features/common/sort-by/interfaces";

// default value for a single store
export const createDefault = (): ISortInitialState => ({
  data: [],
  sortBy: { label: "Newest", value: "ctime" },
});

// initial root state
export const initialState: IState = {};
