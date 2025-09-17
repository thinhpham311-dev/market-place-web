"use client";
import Cart from "@/features/cart";
import MiniCart from "@/features/cart/mini-cart";

export default function ShoppingCart() {

    return (
        <Cart>
            <MiniCart />
        </Cart>
    );
}
