"use client"

//components
import CartWrapper from "@/features/cart/components/CartWrapper";
import CartProvider from "@/features/cart/providers";

//format
import { useHandleShoppingCart } from "../hooks";
import { CART_ROOT } from "@/features/cart/cart-root/constants";

interface ICartProps {
    children?: React.ReactNode;

}

export default function ShoppingCartRoot({ children }: ICartProps) {

    const cart = useHandleShoppingCart({
        storeKey: `${CART_ROOT}_1001`, userId: "1001"
    });

    return (
        <CartProvider contextValues={{ ...cart }}>
            <CartWrapper>
                {children}
            </CartWrapper>
        </CartProvider>
    );
}
