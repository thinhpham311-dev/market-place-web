import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "@/features/product/list/suggestion/store/dataSlice";
import { selectProSuggestionListByStoreKey } from "@/features/product/list/suggestion/store/selectors";
import { SortBy } from "@/types/common/sort";
//stores
import reducer from "@/features/product/list/suggestion/store";
import { injectReducer, removeReducer } from "@/store";

interface IUseFetchData {
  storeKey: string;
  defaultLimit?: number;
  defaultCurrentPage?: number;
  sortBy?: SortBy | null;
}

export function useFetchData({
  storeKey,
  defaultLimit = 10,
  defaultCurrentPage = 1,
  sortBy = "ctime",
}: IUseFetchData) {
  useEffect(() => {
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
  } = useAppSelector(selectProSuggestionListByStoreKey(storeKey));

  useEffect(() => {
    const promise = dispatch(
      getProductList({
        limit: defaultLimit,
        sortBy,
        page: defaultCurrentPage,
      }) as any,
    );
    return () => {
      promise.abort();
    };
  }, [dispatch, defaultCurrentPage, defaultLimit, sortBy]);

  return { products, totalItems, loading, error };
}
