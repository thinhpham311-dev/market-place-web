import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProSuggestionListByStoreKey } from "@/features/product/list/suggestion/store/selectors";
import { selectPaginationByStoreKey } from "@/features/common/pagination/store/selectors";

//stores
import reducer from "@/features/product/list/suggestion/store";
import { injectReducer, removeReducer } from "@/store";

//constants
import { PRO_SUGGESTION_LIST } from "@/features/product/list/suggestion/constants";


export function useFetchData() {
    useEffect(() => {
        injectReducer(PRO_SUGGESTION_LIST, reducer)

        return () => {
            removeReducer(PRO_SUGGESTION_LIST)
        }
    }, [PRO_SUGGESTION_LIST])

    const dispatch = useAppDispatch();

    const { currentPage = 1, limit = 15 } = useAppSelector(
        selectPaginationByStoreKey(PRO_SUGGESTION_LIST)
    );

    const {
        products = [],
        totalItems,
        loading,
        status = "",
        error = null
    } = useAppSelector(selectProSuggestionListByStoreKey(PRO_SUGGESTION_LIST));

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
