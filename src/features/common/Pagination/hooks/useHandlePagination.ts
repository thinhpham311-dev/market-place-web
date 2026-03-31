import { useCallback, useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
  initPagination,
  setPage,
  setLimit,
  syncPagination,
  resetPagination,
} from "@/features/common/pagination/store/stateSlice";
import { useGetPaginationValue } from "./useGetPaginationValue";
import { IPaginationInitialValue } from "@/features/common/pagination/interfaces";
import { withEnsureInit } from "@/features/common/pagination/helpers";

interface IUseHandlePaginationProps {
  initialValue: IPaginationInitialValue;
  storeKey: string;
}

export function useHandlePagination({ storeKey, initialValue }: IUseHandlePaginationProps) {
  const dispatch = useAppDispatch();
  const rest = initialValue;
  const {
    defaultCurrentPage,
    defaultLimit,
    defaultTotalItems,
    isShowDot,
    isShowLabel,
    isShowNav,
  } = initialValue;

  useEffect(() => {
    dispatch(
      initPagination({
        key: storeKey,
        initialValue: {
          defaultCurrentPage,
          defaultLimit,
          defaultTotalItems,
        },
      }),
    );

    return () => {
      dispatch(resetPagination({ key: storeKey }));
    };
  }, [dispatch, storeKey, defaultCurrentPage, defaultLimit, defaultTotalItems]);

  useEffect(() => {
    dispatch(
      syncPagination({
        key: storeKey,
        totalItems: defaultTotalItems,
        limit: defaultLimit,
        currentPage: defaultCurrentPage,
      }),
    );
  }, [dispatch, storeKey, defaultCurrentPage, defaultLimit, defaultTotalItems]);

  const pagination = useGetPaginationValue({ storeKey });

  const { currentPage, totalPages, limit: storeLimit } = pagination;

  const setPageSafe = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        dispatch(withEnsureInit(setPage({ key: storeKey, page }), [storeKey]));
      }
    },
    [dispatch, storeKey, totalPages],
  );

  const setLimitSafe = useCallback((limit: number) => {
    dispatch(withEnsureInit(setLimit({ key: storeKey, limit }), [storeKey]));
  }, [dispatch, storeKey]);

  const resetPaginationSafe = useCallback(() => {
    dispatch(withEnsureInit(resetPagination({ key: storeKey }), [storeKey]));
  }, [dispatch, storeKey]);

  return {
    ...rest,
    isShowDot,
    isShowLabel,
    isShowNav,
    ...pagination,
    limit: storeLimit,
    setLimit: setLimitSafe,
    setPage: setPageSafe,
    resetPagination: resetPaginationSafe,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}
