import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProSuggestionListByStoreKey } from "@/features/product/list/suggestion/store/selectors";
import { useGetPaginationValue } from "@/features/common/pagination/hooks";
//stores
import reducer from "@/features/product/list/suggestion/store";
import { injectReducer, removeReducer } from "@/store";

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

    const { currentPage = 1, limit = 15 } = useGetPaginationValue({ storeKey });

    const {
        products = [],
        totalItems,
        loading,
        error = null
    } = useAppSelector(selectProSuggestionListByStoreKey(storeKey));

    useEffect(() => {
        const promise = dispatch(getProductList({
            limit,
            sortBy: "ctime",
            page: currentPage,
        }) as any);
        return () => {
            promise.abort();
        };
    }, [dispatch, currentPage, limit]);

    return { products, totalItems, loading, error };
}
