"use client"
import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// // Actions and selectors
import { selectShopInfoByStoreKey } from "../store/selectors";
import { getShopById } from "../store/dataSlice";

// Reducer & constants
import reducer from "@/features/shop/store";
import { injectReducer, removeReducer } from "@/store";
import { IShopModel } from '@/models/shop';

// constants
import { SHOP_KEY } from "@/features/shop/constants";

interface IUseFetchDataParams {
    shop_id?: string;
    storeKey: string;
}

export function useFetchData({ shop_id, storeKey }: IUseFetchDataParams) {
    useLayoutEffect(() => {
        const reducerKey = `${SHOP_KEY}_${storeKey}`;
        injectReducer(reducerKey, reducer);
        return () => {
            removeReducer(reducerKey);
        };
    }, [storeKey]);

    const dispatch = useAppDispatch();
    const {
        shopInfo,
        loading = false,
        error = null,
        status = "",
    } = useAppSelector(selectShopInfoByStoreKey(storeKey));

    useEffect(() => {
        if (!shop_id) return;
        const promise = dispatch(
            getShopById({
                shop_id
            } as IShopModel) as any
        );

        return () => {
            promise.abort?.();
        };
    }, [dispatch, shop_id]);

    return { shopInfo, loading, error, status };
}
