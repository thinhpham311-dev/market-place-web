"use client"

import { useEffect, useCallback } from "react"
import {
    setGrouping,
    setExpanded,
    setColumnVisibility,
} from "@/features/common/data-table/store/stateSlice"
import {
    GroupingState,
    ExpandedState,
    VisibilityState,
    useReactTable,
    Updater,
    getCoreRowModel,
    getGroupedRowModel,
    getExpandedRowModel,
} from "@tanstack/react-table"

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { injectReducer, removeReducer } from "@/store"
import { selectDataTableStateByStoreKey } from "@/features/common/data-table/store/selectors"
import { DATA_TABLE } from "@/features/common/data-table/constants"
import reducer from "@/features/common/data-table/store"

interface IUseCartTable {
    storeKey: string
    initialData: any[]
    initialColumns: any[]
}

export const useHandleDataTable = ({
    storeKey,
    initialData = [],
    initialColumns = [],
}: IUseCartTable) => {

    useEffect(() => {
        const reducerKey = `${DATA_TABLE}_${storeKey}`
        injectReducer(reducerKey, reducer)
        return () => removeReducer(reducerKey)
    }, [storeKey])

    const state = useAppSelector(
        selectDataTableStateByStoreKey(storeKey)
    )

    const { grouping, expanded, columnVisibility, sorting } = state
    const dispatch = useAppDispatch()

    // --- Setters to Redux ---
    const setGroupingTable = useCallback(
        (updated: Updater<GroupingState>) => {
            const next =
                typeof updated === "function" ? updated(grouping) : updated
            dispatch(setGrouping(next))
        },
        [dispatch, grouping]
    )

    const setExpandedTable = useCallback(
        (updated: Updater<ExpandedState>) => {
            const next =
                typeof updated === "function" ? updated(expanded) : updated
            dispatch(setExpanded(next))
        },
        [dispatch, expanded]
    )

    const setColumnVisibilityTable = useCallback(
        (updated: Updater<VisibilityState>) => {
            const next =
                typeof updated === "function"
                    ? updated(columnVisibility)
                    : updated
            dispatch(setColumnVisibility(next))
        },
        [dispatch, columnVisibility]
    )

    // --- 👈 Set default grouping one time only ---
    useEffect(() => {
        if (!grouping || grouping.length === 0) {
            dispatch(setGrouping(["itemShopId"]))
        }
    }, [grouping, dispatch])

    // --- React Table ---
    const table = useReactTable({
        data: initialData,
        columns: initialColumns,
        state: {
            expanded,
            grouping,
            columnVisibility,
            sorting,
        },
        onExpandedChange: setExpandedTable,
        onGroupingChange: setGroupingTable,
        onColumnVisibilityChange: setColumnVisibilityTable,
        getCoreRowModel: getCoreRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        enableExpanding: true,
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
