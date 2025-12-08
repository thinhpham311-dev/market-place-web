"use client";

import { useCallback, useEffect } from "react";


import { getItemsInCart, addItemIntoCart, removeItemOutCart, updateQtyItemInCart, removeItemsOutCart } from "@/features/cart/store/cart.slice";
import { ICartItem } from "@/interfaces/cart";


//hooks
import { useDynamicCart } from "@/features/cart/hooks";

//constants

interface IUseCart {
    storeKey: string;
    userId?: string;
}

export const useHandleShoppingCart = ({ storeKey, userId }: IUseCart) => {

    const { state, actions, dispatch } = useDynamicCart(storeKey);
    useEffect(() => {
        if (!userId) return;

        // Không gọi getItems nếu chưa có data
        if (state?.data?.cart_products?.length > 0) {
            dispatch(actions.getItems({ items: state.data.cart_products }));
        }

        const promise = dispatch(
            getItemsInCart({ userId }) as any
        );

        return () => promise.abort();
    }, [dispatch, actions, userId]);


    const handleAddItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(actions.addItem({ item }))
            await dispatch(addItemIntoCart({ userId, item } as { userId: string, item: ICartItem }) as any);
        },
        [dispatch, actions, storeKey, userId]
    );

    const handleRemoveItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(actions.removeItem({ item }))
            await dispatch(removeItemOutCart({ userId, item } as { userId: string, item: ICartItem }) as any);
        },
        [dispatch, actions, storeKey, userId]
    );

    const handleUpdateQtyItem = useCallback(
        async (item: ICartItem) => {
            await dispatch(actions.updateQtyItem({ item }))
            await dispatch(updateQtyItemInCart({ userId, item } as { userId: string, item: ICartItem }) as any);
        },
        [dispatch, actions, userId]
    );

    const handleSelectItems = useCallback(
        (items: ICartItem[]) => {
            dispatch(actions.selectItems({ userId, items } as { userId: string; items: ICartItem[]; }) as any)
        }, [dispatch, actions, userId])

    const handleRemoveAll = useCallback(
        async () => {
            await dispatch(actions.removeAllItems());
        },
        [dispatch, actions, storeKey]
    );

    const handleRemoveSelectedItems = useCallback(
        async (items: ICartItem[]) => {
            await dispatch(actions.removeSelectedItems({ items }))
            await dispatch(removeItemsOutCart({ userId, items } as { userId: string, items: ICartItem[]; }) as any)
        },
        [dispatch, actions, userId]
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
