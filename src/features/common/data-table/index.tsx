"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { IDataTable } from "@/features/common/data-table/store/initials"
import DataTableProvider from "@/features/common/data-table/providers"
import DataTableWrapper from "@/features/common/data-table/components/DataTableWrapper"
import DataTableHeader from "@/features/common/data-table/components/DataTableHeader"
import DataTableBody from "@/features/common/data-table/components/DataTableBody"
import DataTableFooter from "@/features/common/data-table/components/DataTableFooter"
import { useHandleDataTable } from "@/features/common/data-table/hooks"
import { DATA_TABLE } from "@/features/common/data-table/constants"

interface IDataTableProps<TData extends Record<string, any>> {
    storeKey: string,
    initialColumns: ColumnDef<TData>[],
    initialValue: IDataTable,
    initialData: TData[]
}

function DataTable<TData extends Record<string, any>>({
    storeKey,
    ...rest
}: IDataTableProps<TData>) {

    const dataTable = useHandleDataTable({
        reducerKey: DATA_TABLE,
        storeKey,
        ...rest,
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
