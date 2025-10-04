import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Actions and selectors
import { selectSkuDetailByStoreKey } from "../store/selectors";
import { getSkuDetail } from "../store/dataSlice";

// Reducer & constants
import reducer from "@/features/sku/store";
import { injectReducer, removeReducer } from "@/store";

// types
import { ISkuPro } from "@/interfaces/sku";

// constants
import { SKU_KEY } from "@/features/sku/constants";

interface IUseFetchDataParams {
    product_id?: string;
    storeKey: string;
    sku_tier_idx?: (number | null)[];
    optionsCount: number
}

export function useFetchData({ product_id, storeKey, sku_tier_idx, optionsCount }: IUseFetchDataParams) {
    useLayoutEffect(() => {
        const reducerKey = `${SKU_KEY}_${storeKey}`;
        injectReducer(reducerKey, reducer);
        return () => {
            removeReducer(reducerKey);
        };
    }, [storeKey]);

    const dispatch = useAppDispatch();
    const {
        sku,
        loading = false,
        error = null,
        status = "",
    } = useAppSelector(selectSkuDetailByStoreKey(storeKey));


    useEffect(() => {
        if (!product_id) return;
        if (!sku_tier_idx) return;
        const promise = dispatch(
            getSkuDetail({
                product_id,
                sku_tier_idx,
                optionsCount
            } as { optionsCount: number } & ISkuPro) as any
        );

        return () => {
            promise.abort?.();
        };
    }, [dispatch, product_id, sku_tier_idx, optionsCount]);

    return { sku, loading, error, status };
}
