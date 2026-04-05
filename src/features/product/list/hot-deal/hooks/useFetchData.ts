import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProHotDealListByStoreKey } from "../store/selectors";
import type { SortBy } from "@/types/common/sort";
//stores
import reducer from "@/features/product/list/hot-deal/store";
import { injectReducer, removeReducer } from "@/store";

//constants
import { PRO_HOT_DEAL_LIST } from "@/features/product/list/hot-deal/constants";

interface UseFetchDataParams {
  storeKey?: string;
  defaultLimit?: number;
  defaultCurrentPage?: number;
  sortBy?: SortBy | null;
}

export function useFetchData({
  storeKey = PRO_HOT_DEAL_LIST,
  defaultLimit = 12,
  defaultCurrentPage = 1,
  sortBy = "ctime",
}: UseFetchDataParams = {}) {
  useLayoutEffect(() => {
    injectReducer(storeKey, reducer);

    return () => {
      removeReducer(storeKey);
    };
  }, [storeKey]);

  const dispatch = useAppDispatch();

  const {
    products = [],
    totalItems,
    loading,
    error = null,
  } = useAppSelector(selectProHotDealListByStoreKey(storeKey));

  useEffect(() => {
    const promise = dispatch(
      getProductList({ limit: defaultLimit, sortBy, page: defaultCurrentPage }) as any,
    );
    return () => {
      promise.abort();
    };
  }, [defaultCurrentPage, defaultLimit, dispatch, sortBy]);

  return { products, totalItems, loading, error };
}
