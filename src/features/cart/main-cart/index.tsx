"use client"
import React from 'react';

//ui
import ShoppingCartProvider from "@/features/cart/providers";
import { useHandleShoppingCart } from "@/features/cart/hooks";
import CartDataTable from "@/features/cart/components/CartDataTable"
import { MAIN_CART, cartColumns } from "./constants"

const MainCart = () => {
    const cart = useHandleShoppingCart({ storeKey: MAIN_CART });

    return (
        <ShoppingCartProvider contextValues={{ ...cart }}>
            <CartDataTable
                storeKey={MAIN_CART}
                initialColumns={cartColumns}
            />
        </ShoppingCartProvider>
    );
};

export default MainCart;
