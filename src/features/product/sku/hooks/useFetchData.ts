import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Actions and selectors
import { selectSkuDetailByStoreKey } from "../store/selectors";
import { getSkuDetail } from "../store/dataSlice";


// Reducer & constants
import reducer from "@/features/product/sku/store";
import { injectReducer, removeReducer } from "@/store";

//types
import { ISkuPro } from "@/interfaces/sku";
import { VariantOption } from "@/interfaces/spu";

//constants

interface IUseFetchDataParams {
    product_id?: string;
    storeKey: string;
    sku_tier_idx?: number[];
    variants: VariantOption[]
}

export function useFetchData({ product_id, storeKey, sku_tier_idx, variants }: IUseFetchDataParams) {
    useLayoutEffect(() => {
        injectReducer(storeKey, reducer);
        return () => {
            removeReducer(storeKey);
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
        if (!sku_tier_idx || sku_tier_idx.length !== variants.length) {
            return
        }
        const promise = dispatch(getSkuDetail({
            product_id,
            sku_tier_idx
        } as ISkuPro) as any);

        return () => {
            promise.abort?.();
        };
    }, [dispatch,
        product_id,
        sku_tier_idx,
        variants
    ]);

    return { sku, loading, error, status };
}
