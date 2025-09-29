"use client"

import { useEffect, useCallback } from "react"
import {
    setGrouping,
    setExpanded,
    setColumnVisibility,
} from "../store/stateSlice"
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
import { injectReducer } from "@/store"
import { selectCartDataTableStateByStoreKey } from "../store/selectors"
import { CART_DATA_TABLE } from "../constants"
import reducer from "../store"

interface IUseCartTable {
    storeKey: string
    initialData: any[]
    initialColumns: any[]
}

export const useHandleCartDataTable = ({
    storeKey,
    initialData,
    initialColumns
}: IUseCartTable) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        injectReducer(`${CART_DATA_TABLE}_${storeKey}`, reducer)
    }, [storeKey])

    const cartDataTableState = useAppSelector(
        selectCartDataTableStateByStoreKey(storeKey)
    )

    const {
        grouping,
        expanded,
        columnVisibility,
    } = cartDataTableState

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
    const totalItems = initialData.length
    const selectedItems = table.getSelectedRowModel().rows.map(row => row.original)
    const totalSelectedAmount = selectedItems.reduce((sum, item) => sum + (item.itemPrice || 0), 0)

    return {
        ...table,
        totalItems,
        selectedItems,
        totalSelectedAmount
    }
}