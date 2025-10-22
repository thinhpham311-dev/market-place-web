"use client"

import * as React from "react"
import DataTable from "@/features/common/data-table"
import { useShoppingCartContext } from "@/features/cart/hooks"
import { ICartItem } from "@/interfaces/cart"
import LoadingSkeleton from "./Loading"
import NotFound from './NotFound';

interface ICartDataTableProps {
    storeKey: string,
    data: ICartItem[],
    error: Error | null,
    isLoading: boolean
    initialColumns: any[],
    countLoadItems: number
}

const CartDataTable = ({ data = [], isLoading = false, error, countLoadItems = 0, storeKey, initialColumns }: ICartDataTableProps) => {
    const { removeSelectedItems } = useShoppingCartContext()

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
            storeKey={storeKey}
            initialColumns={initialColumns}
            initialData={data}
            removeSelectedItems={removeSelectedItems}
        />
    )
}

export default CartDataTable
