import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import reducer from "@/features/brand/list/all/store";
import { injectReducer, removeReducer } from "@/store";
import { getBrandPopularList } from "@/features/brand/list/popular/store/dataSlice";
import { selectBrandPopularListByStoreKey } from "@/features/brand/list/popular/store/selectors";
import { BRAND_POPULAR_LIST } from "@/features/brand/list/popular/constants";

export function useFetchData() {
  useEffect(() => {
    injectReducer(BRAND_POPULAR_LIST, reducer);

    return () => {
      removeReducer(BRAND_POPULAR_LIST);
    };
  }, []);

  const dispatch = useAppDispatch();
  const {
    brands = [],
    totalItems = 0,
    loading = false,
    error = null,
  } = useAppSelector(selectBrandPopularListByStoreKey(BRAND_POPULAR_LIST));

  useEffect(() => {
    const promise = dispatch(getBrandPopularList({}) as any);

    return () => {
      promise.abort?.();
    };
  }, [dispatch]);

  return { brands, totalItems, loading, error };
}
