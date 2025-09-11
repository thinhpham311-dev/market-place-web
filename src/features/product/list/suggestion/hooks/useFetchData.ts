import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProSuggestionListByStoreKey } from "@/features/product/list/suggestion/store/selectors";
import { selectPaginationByStoreKey } from "@/features/common/pagination/store/selectors";

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

    const { currentPage = 1, limit = 15 } = useAppSelector(
        selectPaginationByStoreKey(storeKey)
    );

    const {
        products = [],
        totalItems,
        loading,
        status = "",
        error = null
    } = useAppSelector(selectProSuggestionListByStoreKey(storeKey));

    useEffect(() => {
        const promise = dispatch(getProductList({
            limit,
            sort: "ctime",
            page: currentPage,
        }) as any);
        return () => {
            promise.abort();
        };
    }, [dispatch, currentPage, limit]);

    return { products, totalItems, loading, error, status };
}
