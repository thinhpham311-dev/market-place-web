import {
  SortingState,
  GroupingState,
  ExpandedState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";

export type CartTable = {
  sorting: SortingState;
  grouping: GroupingState;
  expanded: ExpandedState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  rowSelection: RowSelectionState;
};
