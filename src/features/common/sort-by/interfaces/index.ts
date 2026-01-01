import { Sort } from "@/features/common/sort-by/types";

export interface ISortInitialValue {
  defaultValue: Sort | null;
  defaultData: Sort[];
}

export interface ISortInitialState {
  data: Sort[];
  sortBy: Sort | null;
}

export interface IState {
  [storeKey: string]: ISortInitialState;
}
