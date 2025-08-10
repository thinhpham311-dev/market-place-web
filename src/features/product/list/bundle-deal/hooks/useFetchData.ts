import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProBundleDealListByStoreKey } from "@/features/product/list/bundle-deal/store/selectors";
//stores
import reducer from "@/features/product/list/bundle-deal/store";
import { injectReducer, removeReducer } from "@/store";

//constants
import { PRO_BUNDLE_DEAL_LIST } from "@/features/product/list/bundle-deal/constants";


export function useFetchData() {
    useLayoutEffect(() => {
        injectReducer(PRO_BUNDLE_DEAL_LIST, reducer)

        return () => {
            removeReducer(PRO_BUNDLE_DEAL_LIST)
        }
    }, [PRO_BUNDLE_DEAL_LIST])

    const dispatch = useAppDispatch();

    const {
        products = [],
        totalItems,
        loading,
        error = null
    } = useAppSelector(selectProBundleDealListByStoreKey(PRO_BUNDLE_DEAL_LIST));

    useEffect(() => {
        const promise = dispatch(getProductList({ limit: 12, sort: "ctime", page: 1 }) as any);
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    return { products, totalItems, loading, error };
}
