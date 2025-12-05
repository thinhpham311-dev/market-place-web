"use client"

import { useLayoutEffect, useEffect, useRef, useCallback } from "react"
import {
    setInitialState,
    setGrouping,
    setColumnVisibility,
} from "@/features/common/data-table/store/stateSlice"
import {
    GroupingState,
    VisibilityState,
    useReactTable,
    Updater,
    getCoreRowModel,
    getGroupedRowModel,
} from "@tanstack/react-table"
import { IDataTable } from "@/features/common/data-table/store/initial"
import { useGetDataTableValue } from "./useGetDataTableValue"
import { useAppDispatch } from "@/lib/hooks"
import { injectReducer, removeReducer } from "@/store"
import { DATA_TABLE } from "@/features/common/data-table/constants"
import reducer from "@/features/common/data-table/store"

interface IUseCartTable {
    reducerKey: string;
    storeKey: string
    initialValue: IDataTable
    initialData: any[]
    initialColumns: any[]
}

export const useHandleDataTable = ({
    reducerKey,
    storeKey,
    initialValue,
    initialData = [],
    initialColumns = [],
}: IUseCartTable) => {
    const initRef = useRef(false);
    const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        const dynamicReducerKey = `${DATA_TABLE}_${reducerKey}`
        injectReducer(dynamicReducerKey, reducer)
        return () => removeReducer(dynamicReducerKey)
    }, [reducerKey])

    useEffect(() => {
        if (!initRef.current) {
            dispatch(
                setInitialState({
                    storeKey,
                    initialValue
                })
            );
            initRef.current = true;
        }
    }, [dispatch, storeKey, initialValue]);

    const { grouping, columnVisibility } = useGetDataTableValue(reducerKey, storeKey, {
        grouping: [],
        columnVisibility: {},
    })


    // --- Setters to Redux ---
    const setGroupingTable = useCallback(
        (updated: Updater<GroupingState>) => {
            const next =
                typeof updated === "function" ? updated(grouping) : updated
            dispatch(setGrouping({ storeKey, grouping: next }))
        },
        [dispatch, storeKey, grouping]
    )


    const setColumnVisibilityTable = useCallback(
        (updated: Updater<VisibilityState>) => {
            const next =
                typeof updated === "function"
                    ? updated(columnVisibility)
                    : updated
            dispatch(setColumnVisibility({ storeKey, columnVisibility: next }))
        },
        [dispatch, storeKey, columnVisibility]
    )

    // --- 👈 Set default grouping one time only ---
    useEffect(() => {
        if (!grouping || grouping.length === 0) {
            dispatch(setGrouping({ storeKey, grouping: ["itemShopId"] }))
        }
    }, [grouping, dispatch])

    // --- React Table ---
    const table = useReactTable({
        data: initialData,
        columns: initialColumns,
        state: {
            grouping,
            columnVisibility,
        },
        onGroupingChange: setGroupingTable,
        onColumnVisibilityChange: setColumnVisibilityTable,
        getCoreRowModel: getCoreRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
    })

    // --- Stats ---
    const cart_total_items = initialData.length
    const cart_selected_items = table
        .getSelectedRowModel()
        .rows.map((row) => row.original)
    const cart_selected_items_total = cart_selected_items.reduce(
        (sum, item) =>
            sum +
            Number(item.itemSkuPrice || 0) * Number(item.itemQuantity || 0),
        0
    )

    return {
        table,
        cart_total_items,
        cart_selected_items,
        cart_selected_items_total,
    }
}
