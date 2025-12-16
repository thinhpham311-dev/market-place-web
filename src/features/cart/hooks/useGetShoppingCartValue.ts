"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectShoppingCart } from "@/features/cart/store/selectors";
import { createDefault } from "@/features/cart/store/initial"
import { IShoppingCart } from "@/features/cart/types"

export function useGetShoppingCartValue(dynamicReducerKey: string, storeKey: string, initialValue: IShoppingCart = createDefault()) {
    const state = useAppSelector(selectShoppingCart(dynamicReducerKey, storeKey));

    return useMemo(() => {
        if (!state) {
            return initialValue
        }

        return state
    }, [state, initialValue]);
}