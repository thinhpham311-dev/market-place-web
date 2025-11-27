import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProRecommendedListByStoreKey } from "@/features/product/list/recommended/store/selectors";
//stores
import reducer from "@/features/product/list/recommended/store";
import { injectReducer, removeReducer } from "@/store";

//constants
import { PRO_RECOMMENDDED_LIST } from "@/features/product/list/recommended/constants";


export function useFetchData() {
    useLayoutEffect(() => {
        injectReducer(PRO_RECOMMENDDED_LIST, reducer)

        return () => {
            removeReducer(PRO_RECOMMENDDED_LIST)
        }
    }, [PRO_RECOMMENDDED_LIST])

    const dispatch = useAppDispatch();

    const {
        products = [],
        totalItems,
        loading,
        error = null
    } = useAppSelector(selectProRecommendedListByStoreKey(PRO_RECOMMENDDED_LIST));

    useEffect(() => {
        const promise = dispatch(getProductList({ limit: 12, sort: "ctime", page: 1 }) as any);
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    return { products, totalItems, loading, error };
}
