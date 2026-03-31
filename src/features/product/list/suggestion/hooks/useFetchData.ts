import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "@/features/product/list/suggestion/store/dataSlice";
import { selectProSuggestionListByStoreKey } from "@/features/product/list/suggestion/store/selectors";
import { useGetPaginationValue } from "@/features/common/pagination/hooks";
//stores
import reducer from "@/features/product/list/suggestion/store";
import { injectReducer, removeReducer } from "@/store";

interface IUseFetchData {
  storeKey: string;
  defaultLimit?: number;
  defaultCurrentPage?: number;
  sortBy?: string;
}

export function useFetchData({
  storeKey,
  defaultLimit = 10,
  defaultCurrentPage = 1,
  sortBy = "ctime",
}: IUseFetchData) {
  useLayoutEffect(() => {
    injectReducer(storeKey, reducer);
    return () => {
      removeReducer(storeKey);
    };
  }, [storeKey]);

  const dispatch = useAppDispatch();

  const { currentPage, limit } = useGetPaginationValue({
    storeKey,
    initialValue: {
      currentPage: defaultCurrentPage,
      limit: defaultLimit,
      totalItems: 0,
      totalPages: 1,
      pages: [],
    },
  });
  const {
    products = [],
    totalItems,
    loading,
    error = null,
  } = useAppSelector(selectProSuggestionListByStoreKey(storeKey));

  useEffect(() => {
    const promise = dispatch(
      getProductList({
        limit,
        sortBy,
        page: currentPage,
      }) as any,
    );
    return () => {
      promise.abort();
    };
  }, [dispatch, currentPage, limit, sortBy]);

  return { products, totalItems, loading, error };
}
