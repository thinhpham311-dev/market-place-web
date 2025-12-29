"use client";

import { useLayoutEffect, useEffect, useRef, useCallback, useMemo } from "react";
import {
  setInitialState,
  setGrouping,
  setColumnVisibility,
} from "@/features/common/data-table/store/stateSlice";
import {
  GroupingState,
  VisibilityState,
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
}
export const useHandleDataTable = ({
  reducerKey,
  storeKey,
  initialValue,
  initialData = [],
  initialColumns = [],
}: IUseCartTable) => {
  const initializedRef = useRef(false);
  const data = useMemo(() => initialData, [initialData]);
  const columns = useMemo(() => initialColumns, [initialColumns]);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
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
    },
    onGroupingChange: setGroupingTable,
    onColumnVisibilityChange: setColumnVisibilityTable,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
  });

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
