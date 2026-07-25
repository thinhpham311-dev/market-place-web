import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import reducer from "@/features/brand/list/all/store";
import { injectReducer, removeReducer } from "@/store";
import { getBrandAllList } from "@/features/brand/list/all/store/dataSlice";
import { selectBrandAllListByStoreKey } from "@/features/brand/list/all/store/selectors";
import { BRAND_ALL_LIST } from "@/features/brand/list/all/constants";

export function useFetchData(params?: { search?: string; category_id?: string }) {
  useEffect(() => {
    injectReducer(BRAND_ALL_LIST, reducer);

    return () => {
      removeReducer(BRAND_ALL_LIST);
    };
  }, []);

  const dispatch = useAppDispatch();
  const searchVal = params?.search || "";
  const categoryIdVal = params?.category_id || "";

  const {
    brands = [],
    totalItems = 0,
    loading = false,
    error = null,
  } = useAppSelector(selectBrandAllListByStoreKey(BRAND_ALL_LIST));

  useEffect(() => {
    const promise = dispatch(
      getBrandAllList({ search: searchVal, category_id: categoryIdVal }) as any,
    );

    return () => {
      promise.abort?.();
    };
  }, [dispatch, searchVal, categoryIdVal]);

  return { brands, totalItems, loading, error };
}
