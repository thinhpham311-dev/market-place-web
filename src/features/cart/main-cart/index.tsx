"use client"
import React from 'react';

//ui
import { Card } from '@/components/ui';
import ShoppingCartProvider from "@/features/cart/providers";
import { useHandleShoppingCart } from "@/features/cart/hooks";
import MainCartHeader from './components/MainCartHeader';
import MainCartContent from './components/MainCartContent';
// import { MAIN_CART } from "@/features/cart/main-cart/constants"

const MainCart = () => {
    const cart = useHandleShoppingCart({ userId: "1001" });
    console.log(cart)

    return (
        <ShoppingCartProvider contextValues={{ ...cart }}>
            <Card className='border-none shadow-none'>
                <MainCartHeader />
                <MainCartContent />
            </Card>
        </ShoppingCartProvider >
    );
};

export default MainCart;
