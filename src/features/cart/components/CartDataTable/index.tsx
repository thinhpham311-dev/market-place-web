"use client"

import * as React from "react"
import { DataTable } from "@/features/common"
import type { ColumnDef } from "@tanstack/react-table"
import { ICartItem } from "@/interfaces/cart"

interface ICartDataTableProps {
    cartKey: string
    cartId: string,
    data: ICartItem[],
    initialColumns: ColumnDef<ICartItem>[],
}

const CartDataTable = ({ cartKey = "", data = [], cartId = "", initialColumns }: ICartDataTableProps) => {


    return (
        <DataTable
            reducerKey={cartKey}
            storeKey={`${cartKey}_${cartId}`}
            initialColumns={initialColumns}
            initialData={data}
            initialValue={{
                grouping: ['itemShopId'],
                columnVisibility: {
                    itemShopId: false,
                },
            }}
        />
    )
}

export default CartDataTable
