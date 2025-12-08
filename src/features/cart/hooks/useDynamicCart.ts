"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { injectReducer, removeReducer } from "@/store";
import { selectShoppingCart } from "@/features/cart/store/cart.selector"
import { shoppingCartSlice } from "@/features/cart/store/cart.slice";
import { SHOPPING_CART } from "@/features/cart/constants";

export const useDynamicCart = (storeKey: string, autoRemove = false) => {
    const dispatch = useAppDispatch();

    // Tạo slice cho storeKey (mỗi instance trả actions riêng)
    const { reducer, actions } = useMemo(() => {
        const slice = shoppingCartSlice(storeKey);
        return {
            reducer: slice.reducer,
            actions: slice.actions,
        };
    }, [storeKey]);

    // ⬇️ Inject khi hook chạy
    useEffect(() => {
        const reducerKey = `${SHOPPING_CART}_${storeKey}`;
        injectReducer(reducerKey, reducer);

        return () => {
            if (autoRemove) {
                removeReducer(reducerKey);
            }
        };
    }, [storeKey, reducer, autoRemove]);
    const state = useAppSelector(
        selectShoppingCart(storeKey)
    );
    return {
        actions,
        dispatch,
        state
    };
};
