import { ISortInitialState, IState } from "@/features/common/sort-by/interfaces";

// default value for a single store
export const createDefault = (): ISortInitialState => ({
  data: [],
  sortBy: { label: "Newest", labelKey: "sort_newest", value: "ctime" },
});

// initial root state
export const initialState: IState = {};
