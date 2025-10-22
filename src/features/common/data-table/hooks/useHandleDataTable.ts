"use client"

import { useLayoutEffect, useCallback } from "react"
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
    getExpandedRowModel
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
    initialColumns = []
}: IUseCartTable) => {

    useLayoutEffect(() => {
        const reducerKey = `${DATA_TABLE}_${storeKey}`;

        injectReducer(reducerKey, reducer)
        return () => {
            removeReducer(reducerKey)
        }
    }, [storeKey])

    const cartDataTableState = useAppSelector(
        selectDataTableStateByStoreKey(storeKey)
    )

    const {
        grouping,
        expanded,
        columnVisibility,
    } = cartDataTableState

    const dispatch = useAppDispatch()
    const setGroupingTable = useCallback((updaterOrValue: Updater<GroupingState>) => {
        const value = typeof updaterOrValue === "function"
            ? updaterOrValue(grouping)
            : updaterOrValue
        dispatch(setGrouping(value))
    }, [dispatch, grouping])

    const setExpandedTable = useCallback((updaterOrValue: Updater<ExpandedState>) => {
        const value = typeof updaterOrValue === "function"
            ? updaterOrValue(expanded)
            : updaterOrValue
        dispatch(setExpanded(value))
    }, [dispatch, expanded])

    const setColumnVisibilityTable = useCallback((updaterOrValue: Updater<VisibilityState>) => {
        const value = typeof updaterOrValue === "function"
            ? updaterOrValue(columnVisibility)
            : updaterOrValue
        dispatch(setColumnVisibility(value))
    }, [dispatch, columnVisibility])


    const table = useReactTable({
        data: initialData,
        columns: initialColumns,
        state: {
            expanded,
            grouping,
            columnVisibility
        },
        onExpandedChange: setExpandedTable,
        onGroupingChange: setGroupingTable,
        onColumnVisibilityChange: setColumnVisibilityTable,
        getCoreRowModel: getCoreRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    })
    const cart_total_items = initialData.length
    const cart_selected_items = table.getSelectedRowModel().rows.map(row => row.original)
    const cart_total_selected_amount = cart_selected_items.reduce((sum, item) => sum + ((Number(item.itemSkuPrice) * Number(item.itemQuantity)) || 0), 0)

    return {
        ...table,
        cart_total_items,
        cart_selected_items,
        cart_total_selected_amount
    }
}