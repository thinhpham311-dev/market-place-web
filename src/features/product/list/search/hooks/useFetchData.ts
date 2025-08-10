import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProSearchListByStoreKey } from "@/features/product/list/search/store/selectors";
import { selectPaginationByStoreKey } from "@/features/common/pagination/store/selectors";
import { selectSortByStoreKey } from "@/features/common/sort/store/selectors";
import { selectFilterStoreKey } from "@/features/common/filter/store/selectors";
//stores
import reducer from "@/features/product/list/search/store";
import { injectReducer, removeReducer } from "@/store";

//constants
import { PRO_SEARCH_LIST } from "@/features/product/list/search/constants";


export function useFetchData({ keyword }: { keyword?: string }) {
    useLayoutEffect(() => {
        injectReducer(PRO_SEARCH_LIST, reducer)

        return () => {
            removeReducer(PRO_SEARCH_LIST)
        }
    }, [PRO_SEARCH_LIST])

    const dispatch = useAppDispatch();

    const { currentPage = 1, limit = 15 } = useAppSelector(
        selectPaginationByStoreKey(PRO_SEARCH_LIST)
    );

    const { filter } = useAppSelector(
        selectFilterStoreKey(PRO_SEARCH_LIST)
    );

    const {
        sortBy: { value: sort = "" } = { value: "" }
    } = useAppSelector(selectSortByStoreKey(PRO_SEARCH_LIST));


    const {
        products = [],
        totalItems,
        loading,
        error = null
    } = useAppSelector(selectProSearchListByStoreKey(PRO_SEARCH_LIST));

    useEffect(() => {
        const promise = dispatch(getProductList({
            limit,
            sort,
            page: currentPage,
            filter,
            search: keyword
        }) as any);
        return () => {
            promise.abort();
        };
    }, [dispatch, keyword, filter, sort, currentPage, limit]);

    return { products, totalItems, loading, error };
}
