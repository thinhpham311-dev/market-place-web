import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Actions and selectors
import { getProductListByCategories } from "../store/dataSlice";
import { selectProByCategoryIdByStoreKey } from "../store/selectors";
import { useGetPaginationValue } from "@/features/common/pagination/hooks";
// import { useGetSortByValue } from "@/features/common/sort-by/hooks";
import { useGetFilterValue } from "@/features/common/filter/hooks";
// Reducer & constants
import reducer from "@/features/product/list/by-category-id/store";
import { injectReducer, removeReducer } from "@/store";
import { PRO_LIST_BY_CATEGORYID } from "@/features/product/list/by-category-id/constants";

interface UseFetchDataParams {
  lastId?: string;
}

export function useFetchData({ lastId }: UseFetchDataParams) {
  const dispatch = useAppDispatch();
  const [isInitialLoading, setIsInitialLoading] = useState(Boolean(lastId));
  const [isCategoryTransitionLoading, setIsCategoryTransitionLoading] = useState(false);
  const prevLastIdRef = useRef<string | undefined>(lastId);

  // Inject and clean up reducer
  useLayoutEffect(() => {
    injectReducer(PRO_LIST_BY_CATEGORYID, reducer);
    return () => {
      removeReducer(PRO_LIST_BY_CATEGORYID);
    };
  }, [PRO_LIST_BY_CATEGORYID]);

  // Selectors
  const { currentPage = 1, limit = 20 } = useGetPaginationValue({
    storeKey: PRO_LIST_BY_CATEGORYID,
  });

  const { filter } = useGetFilterValue({ storeKey: PRO_LIST_BY_CATEGORYID });

  // const { sortBy } = useGetSortByValue({ storeKey: PRO_LIST_BY_CATEGORYID });

  const {
    products = [],
    loading = false,
    error = null,
    totalItems = 0,
    status = "idle",
  } = useAppSelector(selectProByCategoryIdByStoreKey(PRO_LIST_BY_CATEGORYID));

  useEffect(() => {
    const prevLastId = prevLastIdRef.current;
    const isCategoryChanged = Boolean(lastId && prevLastId && prevLastId !== lastId);

    if (isCategoryChanged) {
      setIsCategoryTransitionLoading(true);
    }

    prevLastIdRef.current = lastId;
  }, [lastId]);

  // Fetch product list
  useEffect(() => {
    if (!lastId) {
      setIsInitialLoading(false);
      setIsCategoryTransitionLoading(false);
      return;
    }

    setIsInitialLoading(true);

    const promise = dispatch(
      getProductListByCategories({
        limit,
        // sortBy,
        page: currentPage,
        ids: lastId,
        filter,
      }) as any,
    );

    promise.finally?.(() => {
      setIsInitialLoading(false);
      setIsCategoryTransitionLoading(false);
    });

    return () => {
      promise.abort?.(); // optional chaining in case abort is not available
    };
  }, [
    dispatch,
    lastId,
    filter,
    // sortBy,
    currentPage,
    limit,
  ]);

  return {
    products: isCategoryTransitionLoading ? [] : products,
    totalItems,
    loading: isInitialLoading || isCategoryTransitionLoading || loading || status === "idle",
    error,
    status,
  };
}
