import { useCallback, useEffect, useMemo } from "react";
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

const activePaginationInstances = new Map<string, number>();

export function useHandlePagination({ storeKey, initialValue }: IUseHandlePaginationProps) {
  const dispatch = useAppDispatch();
  const { defaultCurrentPage, defaultLimit, defaultTotalItems, isShowDot, isShowLabel, isShowNav } =
    initialValue;

  useEffect(() => {
    const activeInstances = activePaginationInstances.get(storeKey) ?? 0;
    activePaginationInstances.set(storeKey, activeInstances + 1);

    if (activeInstances === 0) {
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
    }

    return () => {
      const nextActiveInstances = Math.max((activePaginationInstances.get(storeKey) ?? 1) - 1, 0);

      if (nextActiveInstances === 0) {
        activePaginationInstances.delete(storeKey);
        dispatch(resetPagination({ key: storeKey }));
        return;
      }

      activePaginationInstances.set(storeKey, nextActiveInstances);
    };
  }, [dispatch, storeKey, defaultCurrentPage, defaultLimit, defaultTotalItems]);

  useEffect(() => {
    dispatch(
      syncPagination({
        key: storeKey,
        totalItems: defaultTotalItems,
        limit: defaultLimit,
      }),
    );
  }, [dispatch, storeKey, defaultLimit, defaultTotalItems]);

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

  const setLimitSafe = useCallback(
    (limit: number) => {
      dispatch(withEnsureInit(setLimit({ key: storeKey, limit }), [storeKey]));
    },
    [dispatch, storeKey],
  );

  const resetPaginationSafe = useCallback(() => {
    dispatch(withEnsureInit(resetPagination({ key: storeKey }), [storeKey]));
  }, [dispatch, storeKey]);

  return useMemo(
    () => ({
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
    }),
    [
      currentPage,
      isShowDot,
      isShowLabel,
      isShowNav,
      pagination,
      resetPaginationSafe,
      setLimitSafe,
      setPageSafe,
      storeLimit,
      totalPages,
    ],
  );
}
