"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import DataTableProvider from "@/features/common/data-table/providers"
import DataTableWrapper from "@/features/common/data-table/components/DataTableWrapper"
import DataTableHeader from "@/features/common/data-table/components/DataTableHeader"
import DataTableBody from "@/features/common/data-table/components/DataTableBody"
import DataTableFooter from "@/features/common/data-table/components/DataTableFooter"
import { useHandleDataTable } from "@/features/common/data-table/hooks"

interface IDataTableProps<TData extends Record<string, any>> {
    storeKey: string,
    initialColumns: ColumnDef<TData>[],
    initialData: TData[]
    removeSelectedItems: (selectedItems: TData[]) => void
}

function DataTable<TData extends Record<string, any>>({
    storeKey,
    initialData,
    initialColumns,
    ...rest
}: IDataTableProps<TData>) {

    const dataTable = useHandleDataTable({
        storeKey,
        initialData,
        initialColumns
    })

    return (
        <DataTableProvider contextValues={{ ...dataTable, ...rest }}>
            <DataTableWrapper>
                <DataTableHeader />
                <DataTableBody />
                <DataTableFooter />
            </DataTableWrapper>
        </DataTableProvider>

    )
}

export default DataTable
