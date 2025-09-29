"use client"
import React from 'react';

//ui
import { Card, CardContent } from "@/components/ui"

import CartDataTable from "@/features/cart/components/CartDataTable"
import { useShoppingCartContext } from "@/features/cart/hooks";
import { MAIN_CART_STORE_KEY, cartColumns } from "./constants"

const MainCart = () => {
    const { cart, removeSelectedItems } = useShoppingCartContext()
    const { items } = cart
    return (
        <Card className='border-none shadow-none'>
            <CardContent>
                <CartDataTable
                    storeKey={MAIN_CART_STORE_KEY}
                    initialColumns={cartColumns}
                    initialData={items}
                    removeSelectedItems={removeSelectedItems}
                />
            </CardContent>
        </Card>
    );
};

export default MainCart;
