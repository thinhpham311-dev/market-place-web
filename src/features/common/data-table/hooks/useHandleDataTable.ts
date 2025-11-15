"use client"

import { useEffect, useCallback } from "react"
import {
    setGrouping,
    setExpanded,
    setColumnVisibility,
    setSorting
} from "@/features/common/data-table/store/stateSlice"
import {
    GroupingState,
    ExpandedState,
    VisibilityState,
    SortingState,
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

    // Dynamically inject/remove reducer
    useEffect(() => {
        const reducerKey = `${DATA_TABLE}_${storeKey}`
        injectReducer(reducerKey, reducer)
        return () => removeReducer(reducerKey)
    }, [storeKey])

    const cartDataTableState = useAppSelector(
        selectDataTableStateByStoreKey(storeKey)
    )

    const { grouping, expanded, columnVisibility, sorting } = cartDataTableState
    const dispatch = useAppDispatch()

    // Memoized setters to sync table state with Redux
    const setGroupingTable = useCallback(
        (updaterOrValue: Updater<GroupingState>) => {
            const value =
                typeof updaterOrValue === "function"
                    ? updaterOrValue(grouping)
                    : updaterOrValue
            dispatch(setGrouping(value))
        },
        [dispatch, grouping]
    )

    const setExpandedTable = useCallback(
        (updaterOrValue: Updater<ExpandedState>) => {
            const value =
                typeof updaterOrValue === "function"
                    ? updaterOrValue(expanded)
                    : updaterOrValue
            dispatch(setExpanded(value))
        },
        [dispatch, expanded]
    )

    const setColumnVisibilityTable = useCallback(
        (updaterOrValue: Updater<VisibilityState>) => {
            const value =
                typeof updaterOrValue === "function"
                    ? updaterOrValue(columnVisibility)
                    : updaterOrValue
            dispatch(setColumnVisibility(value))
        },
        [dispatch, columnVisibility]
    )

    const setSortingTable = useCallback(
        (updaterOrValue: Updater<SortingState>) => {
            const value =
                typeof updaterOrValue === "function"
                    ? updaterOrValue(sorting)
                    : updaterOrValue
            dispatch(setSorting(value))
        },
        [dispatch, sorting]
    )

    // React Table instance
    const table = useReactTable({
        data: initialData,
        columns: initialColumns,
        state: {
            expanded,
            grouping,
            columnVisibility,
            sorting
        },
        onExpandedChange: setExpandedTable,
        onGroupingChange: setGroupingTable,
        onColumnVisibilityChange: setColumnVisibilityTable,
        onSortingChange: setSortingTable,
        getCoreRowModel: getCoreRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        enableExpanding: true,
    })

    // Cart totals & selected items
    const cart_total_items = initialData.length
    const cart_selected_items = table.getSelectedRowModel().rows.map(
        (row) => row.original
    )
    const cart_selected_items_total = cart_selected_items.reduce(
        (sum, item) =>
            sum + Number(item.itemSkuPrice || 0) * Number(item.itemQuantity || 0),
        0
    )

    return {
        table,
        cart_total_items,
        cart_selected_items,
        cart_selected_items_total,
    }
}
