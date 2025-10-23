"use client";

import { useCallback, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import {
    removeAllItems,
    updateItem,
    removeSelectedItems,
} from "@/features/cart/store/cartSlice";
import { getItemsInCart, addItemIntoCart, removeItemOutCart } from "@/features/cart/store/cartSlice";
import { ICartItem } from "@/interfaces/cart";

//store
import reducer from "@/features/cart/store";
import {
    injectReducer,
    // removeReducer
} from "@/store";

//constants
import { useAppSelector } from "@/lib/hooks";
import { selectCartByStoreKey } from "@/features/cart/store/selectors"
import { ITEM_IN_CART } from "@/features/cart/constants";

interface IUseCart {
    userId?: string;
}

export const useHandleShoppingCart = ({ userId }: IUseCart) => {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        const reducerKey = ITEM_IN_CART;
        injectReducer(reducerKey, reducer);
        // return () => {
        //     removeReducer(reducerKey);
        // }
    }, [dispatch]);

    const cart = useAppSelector(selectCartByStoreKey(ITEM_IN_CART))

    useEffect(() => {
        const promise = dispatch(getItemsInCart({ itemUserId: userId } as ICartItem) as any)
        return () => {
            promise.abort()
        }
    }, [dispatch, userId])

    const handleAddItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(addItemIntoCart(item as ICartItem) as any);
        },
        [dispatch]
    );

    const handleRemoveItem = useCallback(
        async (itemSkuId: string) => {
            await dispatch(removeItemOutCart({ itemSkuId } as ICartItem) as any);
        },
        [dispatch]
    );

    const handleUpdateItem = useCallback(
        (itemSkuId: string, itemQuantity: number) => {
            dispatch(updateItem({ itemSkuId, itemQuantity }));
        },
        [dispatch]
    );

    const handleRemoveAll = useCallback(() => {
        dispatch(removeAllItems());
    }, [dispatch]);


    const handleRemoveSelectedItems = useCallback((selectedItems: ICartItem[]) => {
        if (selectedItems.length > 0) {
            dispatch(removeSelectedItems({ items: selectedItems }))
        }
    }, [dispatch])


    return {
        ...cart,
        addItem: handleAddItem,
        updateItem: handleUpdateItem,
        removeItem: handleRemoveItem,
        removeAllItems: handleRemoveAll,
        removeSelectedItems: handleRemoveSelectedItems,
    };
};
