import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "../store/dataSlice";
import { selectProSearchListByStoreKey } from "@/features/product/list/search/store/selectors";
import { useGetPaginationValue } from "@/features/common/pagination/hooks";
import { useGetSortByValue } from "@/features/common/sort/hooks";
import { useGetFilterValue } from "@/features/common/filter/hooks";
//stores
import reducer from "@/features/product/list/search/store";
import { injectReducer, removeReducer } from "@/store";

//constants

interface IUseFetchData {
  storeKey: string;
  keyword?: string;
}

export function useFetchData({ storeKey, keyword }: IUseFetchData) {
  useLayoutEffect(() => {
    injectReducer(storeKey, reducer);

    return () => {
      removeReducer(storeKey);
    };
  }, [storeKey]);

  const dispatch = useAppDispatch();

  const { currentPage = 1, limit = 15 } = useGetPaginationValue({ storeKey });

  const { filter } = useGetFilterValue({ storeKey });

  const { sortBy } = useGetSortByValue({ storeKey });

  const {
    products = [],
    totalItems,
    loading,
    error = null,
    status = "",
  } = useAppSelector(selectProSearchListByStoreKey(storeKey));

  useEffect(() => {
    const promise = dispatch(
      getProductList({
        limit,
        sortBy,
        page: currentPage,
        filter,
        search: keyword,
      }) as any,
    );
    return () => {
      promise.abort();
    };
  }, [dispatch, keyword, filter, sortBy, currentPage, limit]);

  return { products, totalItems, loading, error, status };
}
