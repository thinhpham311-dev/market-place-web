import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProHotDealListByStoreKey } from "../store/selectors";
//stores
import reducer from "@/features/product/list/hot-deal/store";
import { injectReducer, removeReducer } from "@/store";

//constants
import { PRO_HOT_DEAL_LIST } from "@/features/product/list/hot-deal/constants";


export function useFetchData() {
    useLayoutEffect(() => {
        injectReducer(PRO_HOT_DEAL_LIST, reducer)

        return () => {
            removeReducer(PRO_HOT_DEAL_LIST)
        }
    }, [PRO_HOT_DEAL_LIST])

    const dispatch = useAppDispatch();

    const {
        products = [],
        totalItems,
        loading,
        error = null
    } = useAppSelector(selectProHotDealListByStoreKey(PRO_HOT_DEAL_LIST));

    useEffect(() => {
        const promise = dispatch(getProductList({ limit: 12, sort: "ctime", page: 1 }) as any);
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    return { products, totalItems, loading, error };
}
