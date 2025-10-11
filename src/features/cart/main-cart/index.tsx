"use client"
import React from 'react';

//ui
import ShoppingCartProvider from "@/features/cart/providers";
import { useHandleShoppingCart } from "@/features/cart/hooks";
import CartDataTable from "@/features/cart/components/CartDataTable"
import { MAIN_CART, initialColumns } from "@/features/cart/main-cart/constants"

const MainCart = () => {
    const cart = useHandleShoppingCart({ storeKey: MAIN_CART });

    return (
        <ShoppingCartProvider contextValues={{ ...cart }}>
            <CartDataTable
                storeKey={MAIN_CART}
                initialColumns={initialColumns}
            />
        </ShoppingCartProvider>
    );
};

export default MainCart;
