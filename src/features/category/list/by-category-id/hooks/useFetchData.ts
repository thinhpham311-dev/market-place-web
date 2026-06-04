import { useEffect, useState } from "react";
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
  const dispatch = useAppDispatch();
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  /**
   * Inject reducer only once
   */
  useEffect(() => {
    injectReducer(CAT_LIST_BY_ID, reducer);

    return () => {
      removeReducer(CAT_LIST_BY_ID);
    };
  }, []);

  const {
    categories = [],
    totalItems = 0,
    loading = false,
    error = null,
  } = useAppSelector(selectCatByCategoryIdByStoreKey(CAT_LIST_BY_ID));

  useEffect(() => {
    let isActive = true;
    setIsBootstrapping(true);

    const promise = dispatch(
      getCatListById({
        category_id: ids[0],
      } as ICategoryModel) as any,
    );

    promise?.finally?.(() => {
      if (isActive) {
        setIsBootstrapping(false);
      }
    });

    return () => {
      isActive = false;
      promise?.abort?.();
    };
  }, [dispatch, ids]);

  return {
    categories,
    totalItems,
    loading: loading || isBootstrapping,
    error,
    ids,
  };
}
