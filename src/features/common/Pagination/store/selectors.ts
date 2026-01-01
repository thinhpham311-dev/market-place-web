import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";
import { calculatePaginationRange } from "@/features/common/pagination/helpers";
import { DOTS, SIBLING_COUNT } from "@/features/common/pagination/constants";

export const makeSelectPaginationState = (reducerKey: string, storeKey: string) =>
  createSelector(
    [(state: RootState) => state[reducerKey]?.state?.[storeKey]],
    (paginationState) => {
      if (!paginationState) return undefined;

      const { currentPage = 1, totalPages = 1 } = paginationState;

      return {
        ...paginationState,
        pages: calculatePaginationRange(currentPage, totalPages, SIBLING_COUNT, DOTS),
      };
    },
  );

const selectorCache: Record<
  string,
  Record<string, ReturnType<typeof makeSelectPaginationState>>
> = {};

export const selectPaginationByKey = (reducerKey: string, storeKey: string) => {
  if (!selectorCache[reducerKey]) {
    selectorCache[reducerKey] = {};
  }
  if (!selectorCache[reducerKey][storeKey]) {
    selectorCache[reducerKey][storeKey] = makeSelectPaginationState(reducerKey, storeKey);
  }
  return selectorCache[reducerKey][storeKey];
};
