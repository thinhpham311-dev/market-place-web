"use client"

import * as React from "react"
import DataTableProvider from "./providers"
import DataTableWrapper from "./components/DataTableWrapper"
import DataTableHeader from "./components/DataTableHeader"
import DataTableBody from "./components/DataTableBody"
import DataTableFooter from "./components/DataTableFooter"
import { useHandleDataTable } from "./hooks"
import { ICartItem } from "@/interfaces/cart"

interface ICartDataTableProps {
    storeKey: string,
    initialColumns: any[],
    initialData: ICartItem[]
    removeSelectedItems: (selectedItems: ICartItem[]) => void
}

const DataTable = ({
    storeKey,
    initialData,
    initialColumns,
    ...rest
}: ICartDataTableProps) => {

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
