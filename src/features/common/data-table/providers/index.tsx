"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { HeaderGroup, RowModel, ColumnDef } from "@tanstack/react-table"

export interface IDataTableContextType<TData extends Record<string, unknown>> {
    getAllLeafColumns: () => ColumnDef<TData>[]
    getHeaderGroups: () => HeaderGroup<TData>[]
    getRowModel: () => RowModel<TData>
    getAllColumns: () => ColumnDef<TData>[]
    getIsAllRowsSelected: () => boolean
    toggleAllRowsSelected: (value: boolean) => void
    removeSelectedItems: (selectedItems: TData[]) => void
    totalItems: number
    selectedItems: TData[]
    totalSelectedAmount: number
}

interface IDataTableProviderProps<TData extends Record<string, any>> {
    children?: React.ReactNode
    className?: string
    contextValues: IDataTableContextType<TData>
}

export const DataTableContext = React.createContext<IDataTableContextType<any> | null>(null)

const DataTableProvider = <TData extends Record<string, any>>({
    children,
    className,
    contextValues,
}: IDataTableProviderProps<TData>) => {
    return (
        <DataTableContext.Provider value={contextValues}>
            <div className={cn(className)}>{children}</div>
        </DataTableContext.Provider>
    )
}

export default DataTableProvider
