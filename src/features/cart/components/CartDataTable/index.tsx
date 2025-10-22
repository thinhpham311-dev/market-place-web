"use client"

import * as React from "react"
import DataTable from "@/features/common/data-table"
import { Card, CardContent } from "@/components/ui/card"
import { useShoppingCartContext } from "@/features/cart/hooks"

interface ICartDataTableProps {
    storeKey: string,
    initialColumns: any[],
}

const CartDataTable = ({ storeKey, initialColumns }: ICartDataTableProps) => {
    const { data, removeSelectedItems } = useShoppingCartContext()
    const { cart_products: initialData } = data

    return (
        <Card className='border-none shadow-none'>
            <CardContent>
                <DataTable
                    storeKey={storeKey}
                    initialColumns={initialColumns}
                    initialData={initialData}
                    removeSelectedItems={removeSelectedItems}
                />
            </CardContent>
        </Card>)
}

export default CartDataTable
