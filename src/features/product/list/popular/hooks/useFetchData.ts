import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProPopularListByStoreKey } from "../store/selectors";
//stores
import reducer from "@/features/product/list/popular/store";
import { injectReducer, removeReducer } from "@/store";

//constants
import { PRO_POPULAR_LIST } from "@/features/product/list/popular/constants";


export function useFetchData() {
    useLayoutEffect(() => {
        injectReducer(PRO_POPULAR_LIST, reducer)

        return () => {
            removeReducer(PRO_POPULAR_LIST)
        }
    }, [PRO_POPULAR_LIST])

    const dispatch = useAppDispatch();

    const {
        products = [],
        totalItems,
        loading,
        error = null
    } = useAppSelector(selectProPopularListByStoreKey(PRO_POPULAR_LIST));

    useEffect(() => {
        const promise = dispatch(getProductList({ limit: 12, sort: "ctime", page: 1 }) as any);
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    return { products, totalItems, loading, error };
}
