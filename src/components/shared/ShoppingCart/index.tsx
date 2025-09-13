"use client";

import CartSummary from "@/features/cart/components/CartSummary";
import ShoppingCartTrigger from "./ShoppingCartTrigger"
import Cart from "@/features/cart";


export default function ShoppingCart() {

    return (
        <Cart>
            <ShoppingCartTrigger>
                <CartSummary />
            </ShoppingCartTrigger>
        </Cart>
    );
}
