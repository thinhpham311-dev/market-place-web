import { Sort } from "@/features/common/sort/types";

export interface ISortState {
  data: Sort[];
  sortBy: Sort | null;
}

export interface IState {
  [storeKey: string]: ISortState;
}

// default value for a single store
export const createDefault = (): ISortState => ({
  data: [],
  sortBy: { label: "Newest", value: "ctime" },
});

// initial root state
export const initialState: IState = {};
