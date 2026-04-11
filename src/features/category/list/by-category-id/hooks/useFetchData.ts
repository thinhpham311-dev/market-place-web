import { useEffect, useMemo, useState } from "react";
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
  const [resolvedRequestKey, setResolvedRequestKey] = useState<string | null>(null);

  useEffect(() => {
    injectReducer(CAT_LIST_BY_ID, reducer);

    return () => {
      removeReducer(CAT_LIST_BY_ID);
    };
  }, []);

  const dispatch = useAppDispatch();
  const validIds = useMemo(() => ids.filter(Boolean), [ids]);
  const requestKey = useMemo(() => JSON.stringify(validIds), [validIds]);

  const {
    categories = [],
    totalItems = 0,
    loading = false,
    error = null,
  } = useAppSelector(selectCatByCategoryIdByStoreKey(CAT_LIST_BY_ID));

  const isRequestLoading = validIds.length > 0 && resolvedRequestKey !== requestKey;

  useEffect(() => {
    if (validIds.length === 0) {
      setResolvedRequestKey(null);
      return;
    }

    const promise = dispatch(
      getCatListById({
        category_id: validIds[0],
      } as ICategoryModel) as any,
    );

    promise.finally?.(() => {
      setResolvedRequestKey(requestKey);
    });

    return () => {
      promise.abort?.();
    };
  }, [dispatch, requestKey, validIds]);

  return {
    categories: isRequestLoading ? [] : categories,
    totalItems,
    loading: isRequestLoading || loading,
    error,
    validIds,
  };
}
