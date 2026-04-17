import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductListDailyDiscover } from "@/features/product/list/daily-discover/store/dataSlice";
import { selectProDailyDiscoverByStoreKey } from "@/features/product/list/daily-discover/store/selectors";
import { useGetPaginationValue } from "@/features/common/pagination/hooks";
import { SortBy } from "@/types/common/sort";
//stores
import reducer from "@/features/product/list/daily-discover/store";
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
  } = useAppSelector(selectProDailyDiscoverByStoreKey(storeKey));

  useEffect(() => {
    const promise = dispatch(
      getProductListDailyDiscover({
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
