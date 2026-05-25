import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Actions and selectors
import { getProductListByCategories } from "../store/dataSlice";
import { selectProByCategoryIdByStoreKey } from "../store/selectors";
import { useGetPaginationValue } from "@/features/common/pagination/hooks/index";
// import { useGetSortByValue } from "@/features/common/sort-by/hooks";
import { useGetFilterValue } from "@/features/common/filter/hooks";
// Reducer & constants
import reducer from "@/features/product/list/by-category-id/store";
import { injectReducer, removeReducer } from "@/store";
import { PRO_LIST_BY_CATEGORYID } from "@/features/product/list/by-category-id/constants";
import type { Sort } from "@/features/common/sort-by/types";
import { useGetSortByValue } from "@/features/common/sort-by/hooks";
import { SORTBY_OPTIONS } from "../constants";

interface UseFetchDataParams {
  lastId?: string;
  initialPage?: number;
  initialSort?: Sort;
}

export function useFetchData({
  lastId,
  initialPage = 1,
  initialSort = SORTBY_OPTIONS[0],
}: UseFetchDataParams) {
  const dispatch = useAppDispatch();
  const [resolvedRequestKey, setResolvedRequestKey] = useState<string | null>(null);

  // Inject and clean up reducer
  useEffect(() => {
    injectReducer(PRO_LIST_BY_CATEGORYID, reducer);
    return () => {
      removeReducer(PRO_LIST_BY_CATEGORYID);
    };
  }, [PRO_LIST_BY_CATEGORYID]);

  // Selectors
  const { currentPage = 1, limit = 20 } = useGetPaginationValue({
    storeKey: PRO_LIST_BY_CATEGORYID,
    initialValue: {
      currentPage: initialPage,
      limit: 20,
      pages: [],
      totalItems: 0,
      totalPages: 1,
    },
  });

  const { filter } = useGetFilterValue({ storeKey: PRO_LIST_BY_CATEGORYID });

  const { sortBy } = useGetSortByValue({
    storeKey: PRO_LIST_BY_CATEGORYID,
    initialState: {
      data: SORTBY_OPTIONS,
      sortBy: initialSort,
    },
  });

  const {
    products = [],
    loading = false,
    error = null,
    totalItems = 0,
    status = "idle",
  } = useAppSelector(selectProByCategoryIdByStoreKey(PRO_LIST_BY_CATEGORYID));

  const requestKey = useMemo(
    () => JSON.stringify({ lastId, currentPage, limit, filter, sortBy }),
    [lastId, currentPage, limit, filter, sortBy],
  );

  const isRequestLoading = Boolean(lastId) && resolvedRequestKey !== requestKey;

  // Fetch product list
  useEffect(() => {
    if (!lastId) {
      setResolvedRequestKey(null);
      return;
    }

    const promise = dispatch(
      getProductListByCategories({
        limit,
        sortBy,
        page: currentPage,
        filter,
        ids: lastId,
      }) as any,
    );

    promise.finally?.(() => {
      setResolvedRequestKey(requestKey);
    });

    return () => {
      promise.abort?.(); // optional chaining in case abort is not available
    };
  }, [
    dispatch,
    requestKey,
    lastId,
    filter,
    sortBy,
    currentPage,
    limit,
  ]);

  return {
    products: isRequestLoading ? [] : products,
    totalItems,
    loading: isRequestLoading || loading || status === "idle",
    error,
    status,
  };
}
