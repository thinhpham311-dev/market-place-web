"use client"

import * as React from "react"
import { DataTable } from "@/features/common"
import type { ColumnDef } from "@tanstack/react-table"
import { ICartItem } from "@/interfaces/cart"
import LoadingSkeleton from "./LoadingSkeleton"
import NotFound from './NotFound';

interface ICartDataTableProps {
    cartKey: string
    cartId: string,
    data: ICartItem[],
    error: Error | null,
    isLoading: boolean
    initialColumns: ColumnDef<ICartItem>[],
    countLoadItems: number,
}

const CartDataTable = ({ cartKey = "", data = [], isLoading = false, error, countLoadItems = 0, cartId = "", initialColumns }: ICartDataTableProps) => {
    const hasNoData = !data || data.length === 0;

    if (isLoading && hasNoData) {
        return <LoadingSkeleton count={countLoadItems} />;
    }

    if (!isLoading && hasNoData && error) {
        return <NotFound message={error.message || "Something went wrong."} />;
    }

    if (hasNoData) {
        return <NotFound />;
    }


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
