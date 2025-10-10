"use client";

import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    addItem,
    removeAllItems,
    removeItem,
    updateItem,
    removeSelectedItems,
} from "../store/stateSlice";
import { ICartItem } from "@/interfaces/cart";
import reducer from "@/features/cart/store";
import { injectReducer } from "@/store";

//constants
import { useAppSelector } from "@/lib/hooks";
import { selectCartStateByStoreKey } from "@/features/cart/store/selectors"
import { ITEM_IN_CART } from "@/features/cart/constants";

interface IUseCart {
    storeKey: string;
}

export const useHandleShoppingCart = ({ storeKey }: IUseCart) => {
    useEffect(() => {
        const reducerKey = `${ITEM_IN_CART}_${storeKey}`;
        injectReducer(reducerKey, reducer);
    }, [storeKey]);

    const dispatch = useDispatch();
    const cart = useAppSelector(selectCartStateByStoreKey(storeKey));

    const handleAddItem = useCallback(
        (cartItem: ICartItem) => {
            dispatch(addItem({ cartItem }));
        },
        [dispatch]
    );

    const handleUpdateItem = useCallback(
        (itemId: string, quantity: number) => {
            dispatch(updateItem({ itemId, quantity }));
        },
        [dispatch]
    );

    const handleRemoveItem = useCallback(
        (itemId: string) => {
            dispatch(removeItem({ itemId }));
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
        cart,
        addItem: handleAddItem,
        updateItem: handleUpdateItem,
        removeItem: handleRemoveItem,
        removeAllItems: handleRemoveAll,
        removeSelectedItems: handleRemoveSelectedItems,
    };
};
