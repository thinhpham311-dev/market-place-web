import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProRelatedListByStoreKey } from "@/features/product/list/related/store/selectors";
//stores
import reducer from "@/features/product/list/related/store";
import { injectReducer, removeReducer } from "@/store";

//constants
import { PRO_RELATED_LIST } from "@/features/product/list/related/constants";


export function useFetchData() {
    useLayoutEffect(() => {
        injectReducer(PRO_RELATED_LIST, reducer)

        return () => {
            removeReducer(PRO_RELATED_LIST)
        }
    }, [PRO_RELATED_LIST])

    const dispatch = useAppDispatch();

    const {
        products = [],
        totalItems,
        loading,
        error = null
    } = useAppSelector(selectProRelatedListByStoreKey(PRO_RELATED_LIST));

    useEffect(() => {
        const promise = dispatch(getProductList({ limit: 12, sort: "ctime", page: 1 }) as any);
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    return { products, totalItems, loading, error };
}
