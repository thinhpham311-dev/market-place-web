"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectShoppingCart } from "@/features/cart/store/cart.selector";

export const useGetShoppingCartValue = (
    storeKey: string,
) => {
    const value = useAppSelector(
        selectShoppingCart(storeKey)
    );
    return value;
};
