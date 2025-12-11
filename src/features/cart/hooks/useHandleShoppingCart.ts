"use client";

import { useCallback, useLayoutEffect, useEffect, useMemo } from "react";


import { getItemsInCart, addItemIntoCart, removeItemOutCart, updateQtyItemInCart, removeItemsOutCart } from "@/features/cart/store/cartSlice";
import { updateQtyItem, selectItems, removeAllItems } from "@/features/cart/store/cartSlice";
import reducer from "@/features/cart/store"
import { ICartItem } from "@/interfaces/cart";
import { injectReducer, removeReducer } from "@/store";

//hooks
import { useGetShoppingCartValue } from "./useGetShoppingCartValue";

//constants
import { SHOPPING_CART } from "@/features/cart/constants"
import { useAppDispatch } from "@/lib/hooks";
interface IUseCart {
    reducerKey: string;
    storeKey: string;
    userId?: string;
}

export const useHandleShoppingCart = ({ reducerKey, storeKey, userId }: IUseCart) => {
    const dispatch = useAppDispatch()
    // 🔥 Memo hóa key để không tạo lại string mỗi render
    const dynamicReducerKey = useMemo(
        () => `${SHOPPING_CART}_${reducerKey}`,
        [reducerKey]
    );
    // ⬅ reducer injection - only once
    useLayoutEffect(() => {
        injectReducer(dynamicReducerKey, reducer);

        return () => {
            removeReducer(dynamicReducerKey);
        };
    }, [dispatch, dynamicReducerKey]);

    const state = useGetShoppingCartValue(reducerKey, storeKey)

    useEffect(() => {
        if (!userId) return;

        const promise = dispatch(
            getItemsInCart({ storeKey, userId } as { storeKey: string, items: ICartItem[], userId: string }) as any
        );
        return () => promise.abort();

    }, [dispatch, storeKey, userId]);


    const handleAddItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(addItemIntoCart({ storeKey, userId, item } as { storeKey: string, userId: string, item: ICartItem }) as any);
        },
        [dispatch, storeKey, userId]
    );

    const handleRemoveItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(removeItemOutCart({ storeKey, userId, item } as { storeKey: string, userId: string, item: ICartItem }) as any);
        },
        [dispatch, storeKey, userId]
    );

    const handleUpdateQtyItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(updateQtyItem({ storeKey, userId, item } as { storeKey: string, userId: string, item: ICartItem }) as any)

            await dispatch(updateQtyItemInCart({ storeKey, userId, item } as { storeKey: string, userId: string, item: ICartItem }) as any);
        },
        [dispatch, storeKey, userId]
    );

    const handleSelectItems = useCallback(
        (items: ICartItem[]) => {
            dispatch(selectItems({ storeKey, userId, items } as { storeKey: string, userId: string; items: ICartItem[]; }) as any)
        }, [dispatch, storeKey, userId])

    const handleRemoveAll = useCallback(
        async () => {
            await dispatch(removeAllItems({ storeKey } as { storeKey: string }));
        },
        [dispatch, storeKey]
    );

    const handleRemoveSelectedItems = useCallback(
        async (items: ICartItem[]) => {
            await dispatch(removeItemsOutCart({ storeKey, userId, items } as { storeKey: string, userId: string, items: ICartItem[]; }) as any)
        },
        [dispatch, storeKey, userId]
    )

    return {
        ...state,
        addItem: handleAddItem,
        updateQtyItem: handleUpdateQtyItem,
        selectItems: handleSelectItems,
        removeItem: handleRemoveItem,
        removeAllItems: handleRemoveAll,
        removeSelectedItems: handleRemoveSelectedItems,
    };
};
