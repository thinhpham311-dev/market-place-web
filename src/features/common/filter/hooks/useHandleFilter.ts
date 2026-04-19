"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
  setInitialFilter,
  setFilter,
  setFilterData,
  resetFilter,
  resetAllFilters,
} from "../store/stateSlice";
import { IFilterState } from "@/features/common/filter/store/initials";
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/filter/store";
import { useGetFilterValue } from "@/features/common/filter/hooks";

interface IUseFilterParams {
  reducerKey: string;
  storeKey: string;
  initialValue: IFilterState;
}

export function useHandleFilter({ reducerKey, storeKey, initialValue }: IUseFilterParams) {
  const dispatch = useAppDispatch();
  const isInitializedRef = useRef(false);

  /**
   * Inject dynamic reducer on mount
   */
  useEffect(() => {
    injectReducer(reducerKey, reducer);

    return () => {
      removeReducer(reducerKey);
    };
  }, [reducerKey]);

  /**
   * Get filter state from dynamic reducer
   */
  const state = useGetFilterValue({
    reducerKey,
    storeKey,
    initialValue,
  });
  /**
   * Initialize filter only once
   */
  useEffect(() => {
    if (isInitializedRef.current || !initialValue) return;

    dispatch(
      setInitialFilter({
        storeKey,
        initialValue,
      }),
    );

    isInitializedRef.current = true;
  }, [dispatch, storeKey, initialValue]);

  /**
   * Sync filter data when initialValue changes
   */
  useEffect(() => {
    if (!isInitializedRef.current) return;

    dispatch(
      setFilterData({
        storeKey,
        data: initialValue?.data ?? [],
      }),
    );
  }, [dispatch, storeKey, initialValue?.data]);

  /**
   * Set single filter field
   */
  const handleSetFilter = useCallback(
    <T>(key: string, value: T) => {
      dispatch(
        setFilter({
          storeKey,
          key,
          value,
        }),
      );
    },
    [dispatch, storeKey],
  );

  /**
   * Reset one filter field
   */
  const handleResetFilter = useCallback(
    (key: string) => {
      dispatch(
        resetFilter({
          storeKey,
          key,
        }),
      );
    },
    [dispatch, storeKey],
  );

  /**
   * Reset all filters
   */
  const handleResetAllFilters = useCallback(() => {
    dispatch(
      resetAllFilters({
        storeKey,
      }),
    );
  }, [dispatch, storeKey]);

  return {
    ...state,
    handleSetFilter,
    handleResetFilter,
    handleResetAllFilters,
  };
}
