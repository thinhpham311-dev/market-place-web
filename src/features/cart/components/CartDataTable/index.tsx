"use client"

import * as React from "react"
import CartDataTableProvider from "./providers"
import CartTableWrapper from "./CartTableWrapper"
import CartTableHeader from "./CartTableHeader"
import CartTableBody from "./CartTableBody"
import CartTableFooter from "./CartTableFooter"
import { useHandleCartDataTable } from "./hooks"
import { ICartItem } from "@/interfaces/cart"

interface ICartDataTableProps {
    storeKey: string,
    initialColumns: any[],
    initialData: ICartItem[]
    removeSelectedItems: (selectedItems: ICartItem[]) => void
}

const CartDataTable = ({
    storeKey,
    initialData,
    initialColumns,
    ...rest
}: ICartDataTableProps) => {

    const dataTable = useHandleCartDataTable({
        storeKey,
        initialData,
        initialColumns
    })


    return (
        <CartDataTableProvider contextValues={{ ...dataTable, ...rest }}>
            <CartTableWrapper>
                <CartTableHeader />
                <CartTableBody />
                <CartTableFooter />
            </CartTableWrapper>
        </CartDataTableProvider>

    )
}

export default CartDataTable
