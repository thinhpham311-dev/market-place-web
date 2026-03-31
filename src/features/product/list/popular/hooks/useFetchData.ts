import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProPopularListByStoreKey } from "../store/selectors";
import { useGetPaginationValue } from "@/features/common/pagination/hooks";
//stores
import reducer from "@/features/product/list/popular/store";
import { injectReducer, removeReducer } from "@/store";

//constants
import { PRO_POPULAR_LIST } from "@/features/product/list/popular/constants";

interface IUseFetchDataParams {
  storeKey?: string;
  defaultLimit?: number;
  defaultCurrentPage?: number;
}

export function useFetchData({
  storeKey = PRO_POPULAR_LIST,
  defaultLimit = 12,
  defaultCurrentPage = 1,
}: IUseFetchDataParams = {}) {
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
  } = useAppSelector(selectProPopularListByStoreKey(storeKey));

  useEffect(() => {
    const promise = dispatch(
      getProductList({ limit, sortBy: "ctime", page: currentPage }) as any,
    );
    return () => {
      promise.abort();
    };
  }, [dispatch, currentPage, limit]);

  return { products, totalItems, loading, error };
}
