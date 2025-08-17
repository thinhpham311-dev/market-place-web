import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Actions and selectors
import { selectProDetailByStoreKey } from "../store/selectors";
import { getProductDetail } from "../store/dataSlice";


// Reducer & constants
import reducer from "@/features/product/detail/store";
import { injectReducer, removeReducer } from "@/store";
import { PRO_DETAIL } from "@/features/product/detail/constants";

//types
import { Product } from "@/features/product/types";


interface UseFetchDataParams {
    product_id?: string;
}

export function useFetchData({ product_id }: UseFetchDataParams) {
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        injectReducer(PRO_DETAIL, reducer);
        return () => {
            removeReducer(PRO_DETAIL);
        };
    }, [PRO_DETAIL]);

    const {
        product = null,
        loading = false,
        error = null,
        status = "",
    } = useAppSelector(selectProDetailByStoreKey(PRO_DETAIL));

    useEffect(() => {
        const promise = dispatch(getProductDetail({
            product_id
        } as Product) as any);

        return () => {
            promise.abort?.();
        };
    }, [dispatch,
        product_id
    ]);

    return { product, loading, error, status };
}
