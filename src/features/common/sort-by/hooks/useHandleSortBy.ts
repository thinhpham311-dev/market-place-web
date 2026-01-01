"use client";

import { useCallback, useLayoutEffect, useMemo } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setSortBy, resetSortBy } from "@/features/common/sort-by/store/stateSlice";
import { useGetSortByValue } from "@/features/common/sort-by/hooks";
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/sort-by/store";
import type { Sort } from "../types";
import type { ISortInitialValue } from "@/features/common/sort-by/interfaces";
import { SORTBY } from "@/features/common/sort-by/constants";

interface IUseSortBy {
  storeKey: string;
  initialValue: ISortInitialValue;
  reducerKey?: string;
}

export function useSortBy({ storeKey, initialValue, reducerKey = SORTBY }: IUseSortBy) {
  const dispatch = useAppDispatch();
  const { defaultData, defaultValue } = initialValue;

  /* ---------------- inject / remove reducer ---------------- */
  useLayoutEffect(() => {
    injectReducer(reducerKey, reducer);
    return () => {
      removeReducer(reducerKey);
    };
  }, [reducerKey]);

  /* ---------------- memo initial state ---------------- */
  const initialState = useMemo(
    () => ({
      data: defaultData,
      sortBy: defaultValue,
    }),
    [defaultData, defaultValue],
  );

  const state = useGetSortByValue({
    storeKey,
    initialState,
  });
  /* ---------------- actions ---------------- */
  const setSort = useCallback(
    (sortBy: Sort) => {
      dispatch(setSortBy({ storeKey, sortBy, data: defaultData }));
    },
    [dispatch, storeKey],
  );

  const resetSort = useCallback(() => {
    dispatch(resetSortBy({ storeKey }));
  }, [dispatch, storeKey]);

  return {
    ...state,
    setSortBy: setSort,
    resetSortBy: resetSort,
  };
}
