import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllCategoryList } from "@/features/category/list/all/store/dataSlice";
import { selectCatAllListByStoreKey } from "@/features/category/list/all/store/selectors";
import reducer from "@/features/category/list/all/store";
import { injectReducer, removeReducer } from "@/store";
import { CAT_ALL_LIST } from "@/features/category/list/all/constants";

export function useFetchData() {
  useLayoutEffect(() => {
    injectReducer(CAT_ALL_LIST, reducer);

    return () => {
      removeReducer(CAT_ALL_LIST);
    };
  }, []);

  const dispatch = useAppDispatch();

  const {
    categories,
    totalItems,
    loading,
    error = null,
  } = useAppSelector(selectCatAllListByStoreKey(CAT_ALL_LIST));

  useEffect(() => {
    const promise = dispatch(getAllCategoryList({}) as any);
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return { categories, totalItems, loading, error };
}
