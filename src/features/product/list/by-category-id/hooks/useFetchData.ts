import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Actions and selectors
import { getProductListByCategories } from "../store/dataSlice";
import { selectProByCategoryIdByStoreKey } from "../store/selectors";
import { selectPaginationByStoreKey } from "@/features/common/pagination/store/selectors";
import { selectSortByStoreKey } from "@/features/common/sort/store/selectors";
import { selectFilterStoreKey } from "@/features/common/filter/store/selectors";

// Reducer & constants
import reducer from "@/features/product/list/by-category-id/store";
import { injectReducer, removeReducer } from "@/store";
import { PRO_LIST_BY_CATEGORYID } from "@/features/product/list/by-category-id/constants";

interface UseFetchDataParams {
    lastId?: string;
}

export function useFetchData({ lastId }: UseFetchDataParams) {
    const dispatch = useAppDispatch();

    // Inject and clean up reducer
    useEffect(() => {
        injectReducer(PRO_LIST_BY_CATEGORYID, reducer);
        return () => {
            removeReducer(PRO_LIST_BY_CATEGORYID);
        };
    }, [PRO_LIST_BY_CATEGORYID]);

    // Selectors
    const { currentPage = 1, limit = 15 } = useAppSelector(
        selectPaginationByStoreKey(PRO_LIST_BY_CATEGORYID)
    );

    const { filter } = useAppSelector(
        selectFilterStoreKey(PRO_LIST_BY_CATEGORYID)
    );

    const {
        sortBy: { value: sort = "" } = { value: "" }
    } = useAppSelector(selectSortByStoreKey(PRO_LIST_BY_CATEGORYID));

    const {
        products = [],
        loading = false,
        error = null,
        totalItems = 0
    } = useAppSelector(selectProByCategoryIdByStoreKey(PRO_LIST_BY_CATEGORYID));

    // Fetch product list
    useEffect(() => {
        const promise = dispatch(
            getProductListByCategories({
                limit,
                sort,
                page: currentPage,
                ids: lastId,
                filter
            }) as any
        );

        return () => {
            promise.abort?.(); // optional chaining in case abort is not available
        };
    }, [dispatch, lastId, filter, sort, currentPage, limit]);

    return { products, totalItems, loading, error };
}
