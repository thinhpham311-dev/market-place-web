"use client"

import * as React from "react"
import { DataTable } from "@/features/common"
import type { ColumnDef } from "@tanstack/react-table"
import { ICartItemModel } from "@/models/cart";

interface ICartDataTableProps {
    cartKey: string
    cartId: string,
    data: ICartItemModel[],
    initialColumns: ColumnDef<ICartItemModel>[],
}

const CartDataTable = ({ cartKey = "", data = [], cartId = "", initialColumns }: ICartDataTableProps) => {
    return (
        <DataTable
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
