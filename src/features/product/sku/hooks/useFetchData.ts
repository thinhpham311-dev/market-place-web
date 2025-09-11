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
    variants?: VariantOption[]
}

export function useFetchData({ product_id, storeKey, variants }: IUseFetchDataParams) {
    const dispatch = useAppDispatch();
    useLayoutEffect(() => {
        injectReducer(storeKey, reducer);
        return () => {
            removeReducer(storeKey);
        };
    }, [storeKey]);

    const {
        sku,
        loading = false,
        error = null,
        status = "",
    } = useAppSelector(selectSkuDetailByStoreKey(storeKey));

    useEffect(() => {
        const promise = dispatch(getSkuDetail({
            product_id,
            sku_tier_idx: variants
        } as ISkuPro) as any);

        return () => {
            promise.abort?.();
        };
    }, [dispatch,
        product_id,
        variants
    ]);

    return { sku, loading, error, status };
}
