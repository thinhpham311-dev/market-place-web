import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProTopPickListByStoreKey } from "@/features/product/list//top-picks/store/selectors";
//stores
import reducer from "@/features/product/list/top-picks/store";
import { injectReducer, removeReducer } from "@/store";

//constants
import { PRO_TOPPICKS_LIST } from "@/features/product/list/top-picks/constants";


export function useFetchData() {
    useLayoutEffect(() => {
        injectReducer(PRO_TOPPICKS_LIST, reducer)

        return () => {
            removeReducer(PRO_TOPPICKS_LIST)
        }
    }, [PRO_TOPPICKS_LIST])

    const dispatch = useAppDispatch();

    const {
        products = [],
        totalItems,
        loading,
        error = null
    } = useAppSelector(selectProTopPickListByStoreKey(PRO_TOPPICKS_LIST));

    useEffect(() => {
        const promise = dispatch(getProductList({ limit: 12, sort: "ctime", page: 1 }) as any);
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    return { products, totalItems, loading, error };
}
