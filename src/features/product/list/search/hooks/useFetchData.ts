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

interface IUseFetchData {
    storeKey: string;
    keyword?: string;
}

export function useFetchData({ storeKey, keyword }: IUseFetchData) {
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

    const { filter } = useAppSelector(
        selectFilterStoreKey(storeKey)
    );

    const {
        sortBy: { value: sort = "" } = { value: "" }
    } = useAppSelector(selectSortByStoreKey(storeKey));


    const {
        products = [],
        totalItems,
        loading,
        error = null,
        status = ""
    } = useAppSelector(selectProSearchListByStoreKey(storeKey));

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

    return { products, totalItems, loading, error, status };
}
