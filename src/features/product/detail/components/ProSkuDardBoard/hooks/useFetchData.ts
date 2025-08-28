import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getSkuProByVariants } from "../store/dataSlice";
import { selectVariantsStoreKey } from "../../ProVariantsSelector/store/selectors";
import { selectProSkuByStoreKey } from "../store/selectors"
//stores
import reducer from "../store";
import { injectReducer, removeReducer } from "@/store";

import { Product } from "@/features/product/types"

//constants
import { PRO_SKU_DETAIL } from "../constants";

interface IUseFetchDataProps {
    product_id?: string,
    storeKey: string
    sku_tier_idx: string;
}

export function useFetchData({ product_id, storeKey, sku_tier_idx }: IUseFetchDataProps) {
    useLayoutEffect(() => {
        const reducerKey = `${PRO_SKU_DETAIL}_${storeKey}`;

        injectReducer(reducerKey, reducer)

        return () => {
            removeReducer(reducerKey)
        }
    }, [storeKey])

    const dispatch = useAppDispatch();

    const { skuProData, loading, status, error } = useAppSelector(selectProSkuByStoreKey(storeKey))
    useEffect(() => {
        const promise = dispatch(getSkuProByVariants({ product_id, sku_tier_idx } as Product) as any);
        return () => {
            promise.abort();
        };
    }, [dispatch, product_id, sku_tier_idx]);

    return { skuProData, loading, status, error };
}
