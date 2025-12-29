import { GroupingState, VisibilityState } from "@tanstack/react-table";

export interface IDataTable {
  grouping: GroupingState;
  columnVisibility: VisibilityState;
}

export interface IState {
  [storeKey: string]: IDataTable;
}

// default value for a single store
export const createDefault = (): IDataTable => ({
  grouping: ["itemShopId"],
  columnVisibility: {
    itemShopId: false,
  },
});

// initial root state
export const initialState: IState = {};
