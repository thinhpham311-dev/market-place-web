"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import {
  setInitialState,
  setGrouping,
  setColumnVisibility,
} from "@/features/common/data-table/store/stateSlice";
import {
  GroupingState,
  VisibilityState,
  RowSelectionState,
  useReactTable,
  Updater,
  getCoreRowModel,
  getGroupedRowModel,
} from "@tanstack/react-table";
import { IDataTable } from "@/features/common/data-table/store/initials";
import { useGetDataTableValue } from "./useGetDataTableValue";
import { useAppDispatch } from "@/lib/hooks";
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/data-table/store";

interface IUseCartTable {
  reducerKey: string;
  storeKey: string;
  initialValue: IDataTable;
  initialData: any[];
  initialColumns: any[];
  onRowSelectionChange?: (items: any[]) => void;
}
export const useHandleDataTable = ({
  reducerKey,
  storeKey,
  initialValue,
  initialData = [],
  initialColumns = [],
  onRowSelectionChange,
}: IUseCartTable) => {
  const initializedRef = useRef(false);
  const data = initialData;
  const columns = initialColumns;
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    injectReducer(reducerKey, reducer);
    return () => removeReducer(reducerKey);
  }, [reducerKey]);

  useEffect(() => {
    if (!initializedRef.current && initialValue) {
      dispatch(setInitialState({ storeKey, initialValue }));
      initializedRef.current = true;
    }
  }, [dispatch, storeKey, initialValue]);

  const { grouping, columnVisibility } = useGetDataTableValue({
    reducerKey,
    storeKey,
    initialValue,
  });

  const setGroupingTable = useCallback(
    (updated: Updater<GroupingState>) => {
      const next = typeof updated === "function" ? updated(grouping) : updated;
      dispatch(setGrouping({ storeKey, grouping: next }));
    },
    [dispatch, storeKey, grouping],
  );

  const setColumnVisibilityTable = useCallback(
    (updated: Updater<VisibilityState>) => {
      const next = typeof updated === "function" ? updated(columnVisibility) : updated;
      dispatch(setColumnVisibility({ storeKey, columnVisibility: next }));
    },
    [dispatch, storeKey, columnVisibility],
  );

  useEffect(() => {
    if (!grouping || grouping.length === 0) {
      dispatch(setGrouping({ storeKey, grouping: ["itemShopId"] }));
    }
  }, [grouping, dispatch]);

  const table = useReactTable({
    data,
    columns,
    state: {
      grouping,
      columnVisibility,
      rowSelection,
    },
    onGroupingChange: setGroupingTable,
    onColumnVisibilityChange: setColumnVisibilityTable,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
  });

  useEffect(() => {
    if (onRowSelectionChange) {
      const selectedLeafRows: any[] = [];
      const traverse = (rows: any[]) => {
        for (const r of rows) {
          if (r.getIsSelected() && !r.getIsGrouped()) {
            selectedLeafRows.push(r.original);
          }
          if (r.subRows && r.subRows.length > 0) {
            traverse(r.subRows);
          }
        }
      };
      traverse(table.getRowModel().rows);
      onRowSelectionChange(selectedLeafRows);
    }
  }, [rowSelection, data, table, onRowSelectionChange]);

  const total_items = initialData.length;

  // Always fresh selected rows
  const items_selected = table.getSelectedRowModel().rows.map((row) => row.original);

  const total_items_selected = items_selected.length;

  const total_price_items_selected = items_selected.reduce(
    (sum, item) => sum + Number(item.itemSkuPrice || 0) * Number(item.itemQuantity || 0),
    0,
  );

  return {
    table,
    items_selected,
    total_items,
    total_items_selected,
    total_price_items_selected,
  };
};
