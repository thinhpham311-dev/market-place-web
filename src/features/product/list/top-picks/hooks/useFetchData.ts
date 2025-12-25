import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProTopPickListByStoreKey } from "@/features/product/list/top-picks/store/selectors";
//stores
import reducer from "@/features/product/list/top-picks/store";
import { injectReducer, removeReducer } from "@/store";

//constants

interface IUseFetchData {
    storeKey: string;
}

export function useFetchData({ storeKey }: IUseFetchData) {
    useLayoutEffect(() => {
        injectReducer(storeKey, reducer)
        return () => {
            removeReducer(storeKey)
        }
    }, [storeKey])

    const dispatch = useAppDispatch();

    const {
        products = [],
        totalItems,
        loading,
        error = null
    } = useAppSelector(selectProTopPickListByStoreKey(storeKey));

    useEffect(() => {
        const promise = dispatch(getProductList({ limit: 12, sortBy: "ctime", page: 1 }) as any);
        ;
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    return { products, totalItems, loading, error };
}
