"use client";

import ShoppingCartTrigger from "./ShoppingCartTrigger"
import Cart from "@/features/cart";


export default function ShoppingCart() {

    return (
        <Cart>
            <ShoppingCartTrigger />
        </Cart>
    );
}
