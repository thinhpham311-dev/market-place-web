"use client"

//components
import CartWrapper from "@/features/cart/components/CartWrapper";
import CardProvider from "@/features/cart/providers";

//format
import { useHandleShoppingCart } from "./hooks";

//constants
import { CART_STATE } from "@/features/cart/constants";

interface ICartProps {
    children?: React.ReactNode;
}

export default function Cart({ children }: ICartProps) {

    const cart = useHandleShoppingCart({ storeKey: CART_STATE });

    return (
        <CardProvider contextValues={{ ...cart }}>
            <CartWrapper>
                {children}
            </CartWrapper>
        </CardProvider>
    );
}
