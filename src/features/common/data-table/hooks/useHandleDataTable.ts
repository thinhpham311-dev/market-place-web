"use client"

import { useEffect, useCallback } from "react"
import {
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

    const { grouping, columnVisibility } = state
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
