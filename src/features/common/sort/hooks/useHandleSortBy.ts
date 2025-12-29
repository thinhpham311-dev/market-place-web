"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setInitialValue, setSortBy, resetSortBy } from "@/features/common/sort/store/stateSlice";
import { useGetSortByValue } from "@/features/common/sort/hooks";
import type { Sort } from "../types";
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/sort/store";
import { ISortState } from "@/features/common/sort/store/initials";

interface IUseSortBy {
  reducerKey: string;
  initialValue: ISortState;
  storeKey: string;
}

export function useSortBy({ reducerKey, storeKey, initialValue }: IUseSortBy) {
  const initializedRef = useRef(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    injectReducer(reducerKey, reducer);

    return () => {
      removeReducer(reducerKey);
    };
  }, [reducerKey]);

  useEffect(() => {
    if (!initializedRef.current || initialValue) {
      dispatch(setInitialValue({ storeKey, initialValue }));
      initializedRef.current = true;
    }
  }, [dispatch, storeKey]);

  const state = useGetSortByValue({ reducerKey, storeKey, initialValue });

  const handleSortChange = useCallback(
    (value: Sort) => {
      dispatch(setSortBy({ storeKey, sortBy: value }));
    },
    [dispatch, storeKey],
  );

  const handleResetSort = useCallback(() => {
    dispatch(resetSortBy({ storeKey }));
  }, [dispatch, storeKey]);

  return {
    ...state,
    setSortBy: handleSortChange,
    resetSortBy: handleResetSort,
  };
}
