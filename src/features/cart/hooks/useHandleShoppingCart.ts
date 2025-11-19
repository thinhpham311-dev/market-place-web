"use client";

import { useCallback, useEffect } from "react";

import { useDispatch } from "react-redux";
import {
    removeAllItems,
    updateQtyItemInCart,
    selectItems,
    removeItemsOutCart,
    clearServerCart
} from "@/features/cart/store/cartSlice";
import { getItemsInCart, addItemIntoCart, removeItemOutCart } from "@/features/cart/store/cartSlice";
import { ICartItem, ICart } from "@/interfaces/cart";

//store
import reducer from "@/features/cart/store";
import {
    injectReducer
} from "@/store";

//constants
import { useAppSelector } from "@/lib/hooks";
import { selectCartByStoreKey } from "@/features/cart/store/selectors"

interface IUseCart {
    userId?: string;
    storeKey: string
}

export const useHandleShoppingCart = ({ userId, storeKey }: IUseCart) => {
    useEffect(() => {
        const reducerKey = storeKey;
        injectReducer(reducerKey, reducer);

    }, [storeKey]);
    const dispatch = useDispatch();


    useEffect(() => {
        if (!userId) return;

        dispatch(clearServerCart())

        const promise = dispatch(
            getItemsInCart({ cart_userId: userId } as ICart) as any
        )

        return () => {
            promise.abort()
        }
    }, [dispatch, userId])

    const cart = useAppSelector(selectCartByStoreKey(storeKey))

    const handleAddItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(addItemIntoCart({ userId, item } as { userId: string, item: ICartItem }) as any);
        },
        [dispatch, userId]
    );

    const handleRemoveItem = useCallback(
        async (itemSkuId: string, itemShopId: string) => {
            await dispatch(removeItemOutCart({ itemSkuId, itemShopId } as ICartItem) as any);

        },
        [dispatch]
    );

    const handleUpdateQtyItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(updateQtyItemInCart({ userId, item } as { cartId: string, userId: string, item: ICartItem }) as any);
        },
        [dispatch, userId]
    );

    const handleSelectItems = useCallback(
        (items: ICartItem[]) => {
            dispatch(selectItems({ items } as { items: ICartItem[]; }) as any)
        }, [dispatch])

    const handleRemoveAll = useCallback(
        async () => {
            await dispatch(removeAllItems());
        },
        [dispatch]
    );

    const handleRemoveSelectedItems = useCallback(
        async (items: ICartItem[]) => {
            await dispatch(removeItemsOutCart({ items } as { items: ICartItem[]; }) as any)
        },
        [dispatch]
    )


    return {
        ...cart,
        addItem: handleAddItem,
        updateQtyItem: handleUpdateQtyItem,
        selectItems: handleSelectItems,
        removeItem: handleRemoveItem,
        removeAllItems: handleRemoveAll,
        removeSelectedItems: handleRemoveSelectedItems,
    };
};
