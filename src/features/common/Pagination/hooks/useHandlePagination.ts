import { useLayoutEffect, useMemo, useCallback } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setPage, resetPagination } from "@/features/common/pagination/store/stateSlice";
import { useGetPaginationValue } from "@/features/common/pagination/hooks";
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/pagination/store";
import { IPaginationInitialValue } from "@/features/common/pagination/interfaces";
import { PAGINATION } from "@/features/common/pagination/constants";
import { calculatePaginationRange } from "@/features/common/pagination/helpers";

interface IUseHandlePaginationProps {
  reducerKey?: string;
  initialValue: IPaginationInitialValue;
  siblingCount?: number;
  storeKey: string;
}
const DOTS = "...";

export function useHandlePagination({
  reducerKey = PAGINATION,
  storeKey,
  initialValue,
  siblingCount = 1,
}: IUseHandlePaginationProps) {
  const dispatch = useAppDispatch();
  const { defaultCurrentPage, defaultLimit, defaultTotalItems, ...rest } = initialValue;

  useLayoutEffect(() => {
    injectReducer(reducerKey, reducer);

    return () => {
      removeReducer(reducerKey);
    };
  }, [reducerKey]);

  const state = useGetPaginationValue({
    reducerKey,
    storeKey,
    initialValue: {
      currentPage: defaultCurrentPage,
      limit: defaultLimit,
      totalItems: defaultTotalItems,
      totalPages: Math.ceil(defaultTotalItems / defaultLimit),
    },
  });

  const { currentPage, totalPages, limit: storeLimit } = state;

  const paginationRange = useMemo(
    () => calculatePaginationRange(currentPage, totalPages, siblingCount, DOTS),
    [currentPage, totalPages, siblingCount],
  );

  const setPageSafe = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        dispatch(setPage({ storeKey, page }));
      }
    },
    [dispatch, storeKey, totalPages],
  );

  const resetPaginationSafe = useCallback(() => {
    dispatch(resetPagination({ storeKey }));
  }, [dispatch, storeKey]);

  return {
    ...rest,
    ...state,
    perPage: storeLimit,
    pages: paginationRange,
    setPage: setPageSafe,
    resetPagination: resetPaginationSafe,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}
