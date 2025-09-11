"use client";

import { useCallback, useEffect } from "react";
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
import { injectReducer, removeReducer } from "@/store";

//constants
import { useAppSelector } from "@/lib/hooks";
import { selectCartStateByStoreKey } from "@/features/cart/store/selectors"

interface IUseCart {
    storeKey: string;
}

export const useHandleShoppingCart = ({ storeKey }: IUseCart) => {
    const dispatch = useDispatch();
    useEffect(() => {

        injectReducer(storeKey, reducer);
        return () => {
            removeReducer(storeKey);
        };
    }, [storeKey]);

    const cart = useAppSelector(selectCartStateByStoreKey(storeKey));

    const handleAddItem = useCallback(
        (cartItem: ICartItem) => {
            dispatch(addItem({ cartItem }));
        },
        [dispatch]
    );

    const handleUpdateItem = useCallback(
        (sku_id: string, quantity: number) => {
            dispatch(updateItem({ sku_id, quantity }));
        },
        [dispatch]
    );

    const handleRemoveItem = useCallback(
        (sku_id: string) => {
            dispatch(removeItem({ sku_id }));
        },
        [dispatch]
    );

    const handleRemoveAll = useCallback(() => {
        dispatch(removeAllItems());
    }, [dispatch]);

    const handleToggleItemSelection = useCallback(
        (sku_id: string, checked: boolean) => {
            dispatch(toggleItemSelection({ sku_id, checked }));
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
