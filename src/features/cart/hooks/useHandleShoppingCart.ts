"use client";

import { useCallback, useLayoutEffect, useEffect, useMemo } from "react";
import {
    getItemsInCart,
    createItemInCart,
    deleteItemOutCart,
    updateQtyItemInCart,
    deleteItemsSelectedOutCart,
    deleteItemsAllOutCart,
    updateVariantsItemInCart
} from "@/features/cart/store/cartSlice";
import { selectItems } from "@/features/cart/store/cartSlice";
import reducer from "@/features/cart/store"
import { ICartItem } from "@/interfaces/cart";
import { injectReducer, removeReducer } from "@/store";

//hooks
import { useGetShoppingCartValue } from "./useGetShoppingCartValue";
import { useCartErrorHandler } from "./useCartErrorHandler"
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
    const dynamicReducerKey = useMemo(
        () => `${SHOPPING_CART}_${reducerKey}`,
        [reducerKey]
    );
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


    const handleCreateItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(createItemInCart({ storeKey, userId, item } as { storeKey: string, userId: string, item: ICartItem }) as any);
        },
        [dispatch, storeKey, userId]
    );

    const handleDeleteItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(deleteItemOutCart({ storeKey, userId, item } as { storeKey: string, userId: string, item: ICartItem }) as any);
        },
        [dispatch, storeKey, userId]
    );

    const handleUpdateQtyItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(updateQtyItemInCart({ storeKey, userId, item } as { storeKey: string, userId: string, item: ICartItem }) as any);
        },
        [dispatch, storeKey, userId]
    );

    const handleUpdateVariantsItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(updateVariantsItemInCart({ storeKey, userId, item } as { storeKey: string, userId: string, item: ICartItem }) as any);
        },
        [dispatch, storeKey, userId]
    );

    const handleItemsSelected = useCallback(
        (items: ICartItem[]) => {
            dispatch(selectItems({ storeKey, userId, items } as { storeKey: string, userId: string; items: ICartItem[]; }) as any)
        }, [dispatch, storeKey, userId])



    const handleDeleteItemsSelected = useCallback(
        async (items: ICartItem[]) => {
            await dispatch(deleteItemsSelectedOutCart({ storeKey, userId, items } as { storeKey: string, userId: string, items: ICartItem[]; }) as any)
        },
        [dispatch, storeKey, userId]
    )

    const handleDeleteItemsAll = useCallback(
        async () => {
            await dispatch(deleteItemsAllOutCart({ storeKey, userId } as { storeKey: string, userId: string }) as any)
        },
        [dispatch, storeKey, userId]
    )

    return {
        ...state,
        createItem: handleCreateItem,
        setItemsSelected: handleItemsSelected,
        updateQtyItem: handleUpdateQtyItem,
        updateVariantsItem: handleUpdateVariantsItem,
        deleteItem: handleDeleteItem,
        deleteItemsAll: handleDeleteItemsAll,
        deleteItemsSelected: handleDeleteItemsSelected,
    };
};
