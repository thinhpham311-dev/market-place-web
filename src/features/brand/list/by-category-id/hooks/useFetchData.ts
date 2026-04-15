import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import reducer from "@/features/brand/list/by-category-id/store";
import { injectReducer, removeReducer } from "@/store";
import { getBrandAllListByCategoriesId } from "@/features/brand/list/by-category-id/store/dataSlice";
import { selectBrandListByCategoriesIdAndStoreKey } from "@/features/brand/list/by-category-id/store/selectors";
import { BRAND_ALL_LIST_BY_CATEGORIES_ID } from "@/features/brand/list/by-category-id/constants";

interface UseFetchDataParams {
  lastId?: string;
}

export function useFetchData({ lastId }: UseFetchDataParams) {
  useEffect(() => {
    injectReducer(BRAND_ALL_LIST_BY_CATEGORIES_ID, reducer);

    return () => {
      removeReducer(BRAND_ALL_LIST_BY_CATEGORIES_ID);
    };
  }, []);

  const dispatch = useAppDispatch();
  const {
    brands = [],
    totalItems = 0,
    loading = false,
    error = null,
  } = useAppSelector(selectBrandListByCategoriesIdAndStoreKey(BRAND_ALL_LIST_BY_CATEGORIES_ID));

  useEffect(() => {
    if (!lastId) return;

    const promise = dispatch(
      getBrandAllListByCategoriesId({
        ids: lastId,
        limit: 50,
        sortBy: "ctime",
        page: 1,
      }) as any,
    );

    return () => {
      promise.abort?.();
    };
  }, [dispatch, lastId]);

  return { brands, totalItems, loading, error };
}
