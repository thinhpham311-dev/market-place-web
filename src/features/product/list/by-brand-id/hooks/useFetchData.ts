import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Actions and selectors
import { getProductListByBrand } from "@/features/product/list/by-brand-id/store/dataSlice";
import { selectProByBrandIdByStoreKey } from "@/features/product/list/by-brand-id/store/selectors";
// Reducer & constants
import reducer from "@/features/product/list/by-brand-id/store";
import { injectReducer, removeReducer } from "@/store";
import { PRO_LIST_BY_BRANDID } from "@/features/product/list/by-brand-id/constants";

interface UseFetchDataParams {
  lastId?: string;
}

export function useFetchData({ lastId }: UseFetchDataParams) {
  const dispatch = useAppDispatch();
  const [resolvedRequestKey, setResolvedRequestKey] = useState<string | null>(null);

  // Inject and clean up reducer
  useEffect(() => {
    injectReducer(PRO_LIST_BY_BRANDID, reducer);
    return () => {
      removeReducer(PRO_LIST_BY_BRANDID);
    };
  }, [PRO_LIST_BY_BRANDID]);

  const {
    products = [],
    loading = false,
    error = null,
    totalItems = 0,
    status = "idle",
  } = useAppSelector(selectProByBrandIdByStoreKey(PRO_LIST_BY_BRANDID));

  const requestKey = useMemo(() => JSON.stringify({ lastId }), [lastId]);

  const isRequestLoading = Boolean(lastId) && resolvedRequestKey !== requestKey;

  // Fetch product list
  useEffect(() => {
    if (!lastId) {
      setResolvedRequestKey(null);
      return;
    }

    const promise = dispatch(
      getProductListByBrand({
        limit: 50,
        // sortBy,
        page: 1,
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
    // sortBy,
  ]);

  return {
    products: isRequestLoading ? [] : products,
    totalItems,
    loading: isRequestLoading || loading || status === "idle",
    error,
    status,
  };
}
