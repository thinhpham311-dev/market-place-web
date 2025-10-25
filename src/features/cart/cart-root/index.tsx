"use client"

//components
import CartWrapper from "@/features/cart/components/CartWrapper";
import CartProvider from "@/features/cart/providers";

//format
import { useHandleShoppingCart } from "../hooks";
import { SHOPPING_CART } from "@/features/cart/constants";


interface ICartProps {
    children?: React.ReactNode;

}

export default function ShoppingCartRoot({ children }: ICartProps) {

    const cart = useHandleShoppingCart({ storeKey: SHOPPING_CART, userId: "1001" });

    return (
        <CartProvider contextValues={{ ...cart }}>
            <CartWrapper>
                {children}
            </CartWrapper>
        </CartProvider>
    );
}
