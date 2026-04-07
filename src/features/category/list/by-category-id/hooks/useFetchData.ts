import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCatListById } from "@/features/category/list/by-category-id/store/dataSlice";
import { selectCatByCategoryIdByStoreKey } from "@/features/category/list/by-category-id/store/selectors";
import reducer from "@/features/category/list/by-category-id/store";
import { injectReducer, removeReducer } from "@/store";
import { CAT_LIST_BY_ID } from "@/features/category/list/by-category-id/constants";
import { ICategoryModel } from "@/models/category";

interface UseFetchDataParams {
  ids: string[];
}

export function useFetchData({ ids }: UseFetchDataParams) {
  useEffect(() => {
    injectReducer(CAT_LIST_BY_ID, reducer);

    return () => {
      removeReducer(CAT_LIST_BY_ID);
    };
  }, []);

  const dispatch = useAppDispatch();
  const validIds = useMemo(() => ids.filter(Boolean), [ids]);

  const {
    categories = [],
    totalItems = 0,
    loading = false,
    error = null,
  } = useAppSelector(selectCatByCategoryIdByStoreKey(CAT_LIST_BY_ID));

  useEffect(() => {
    if (validIds.length === 0) {
      return;
    }

    const promise = dispatch(
      getCatListById({
        category_id: validIds[0],
      } as ICategoryModel) as any,
    );

    return () => {
      promise.abort?.();
    };
  }, [dispatch, validIds]);

  return {
    categories,
    totalItems,
    loading,
    error,
    validIds,
  };
}
