"use client"

//components
import CartWrapper from "@/features/cart/components/CartWrapper";
import CartProvider from "@/features/cart/providers";

//format
import { useHandleShoppingCart } from "./hooks";

//constants
import { ITEM_IN_CART } from "@/features/cart/constants";

interface ICartProps {
    children?: React.ReactNode;
}

export default function CartContainerProvider({ children }: ICartProps) {

    const cart = useHandleShoppingCart({ storeKey: ITEM_IN_CART });

    return (
        <CartProvider contextValues={{ ...cart }}>
            <CartWrapper>
                {children}
            </CartWrapper>
        </CartProvider>
    );
}
