"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Table } from "@tanstack/react-table"

export interface IDataTableContextType<TData extends Record<string, unknown>> {
    table: Table<TData>
    cart_total_items: number
    cart_selected_items: TData[]
    cart_selected_items_total: number
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
