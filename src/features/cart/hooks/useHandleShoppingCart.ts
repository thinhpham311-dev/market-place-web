"use client";

import { useCallback, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import {
    addItem,
    removeAllItems,
    removeItem,
    updateItem,
    toggleItemSelection,
    removeSelectedItems,
} from "../store/stateSlice";
import { ICartItem } from "@/interfaces/cart";
import reducer from "@/features/cart/store";
import { injectReducer } from "@/store";

//constants
import { useAppSelector } from "@/lib/hooks";
import { selectCartStateByStoreKey } from "@/features/cart/store/selectors"

interface IUseCart {
    storeKey: string;
}

export const useHandleShoppingCart = ({ storeKey }: IUseCart) => {
    useLayoutEffect(() => {
        injectReducer(storeKey, reducer);
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

    const handleToggleItemSelection = useCallback(
        (itemId: string, checked: boolean) => {
            dispatch(toggleItemSelection({ itemId, checked }));
        },
        [dispatch]
    );

    const handleRemoveSelectedItems = useCallback(() => {
        dispatch(removeSelectedItems());
    }, [dispatch]);

    return {
        cart,
        addItem: handleAddItem,
        updateItem: handleUpdateItem,
        removeItem: handleRemoveItem,
        removeAllItems: handleRemoveAll,
        toggleItemSelection: handleToggleItemSelection,
        removeSelectedItems: handleRemoveSelectedItems,
    };
};
