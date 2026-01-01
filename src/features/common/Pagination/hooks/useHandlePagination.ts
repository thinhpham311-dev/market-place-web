import { useCallback, useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
  initPagination,
  setPage,
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
  const { defaultCurrentPage, defaultTotalItems, defaultLimit, ...rest } = initialValue;
  useEffect(() => {
    dispatch(
      initPagination({
        key: storeKey,
        initialValue: {
          currentPage: defaultCurrentPage,
          totalItems: defaultTotalItems,
          limit: defaultLimit,
        },
      }),
    );
    return () => {
      dispatch(resetPagination({ key: storeKey }));
    };
  }, [dispatch, storeKey, defaultCurrentPage, defaultTotalItems]);

  const pagination = useGetPaginationValue({ storeKey });

  const { currentPage, totalPages } = pagination;

  const setPageSafe = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        dispatch(withEnsureInit(setPage({ key: storeKey, page }), [storeKey]));
      }
    },
    [dispatch, storeKey, totalPages],
  );

  const resetPaginationSafe = useCallback(() => {
    dispatch(withEnsureInit(resetPagination({ key: storeKey }), [storeKey]));
  }, [dispatch, storeKey]);

  return {
    ...rest,
    ...pagination,
    setPage: setPageSafe,
    resetPagination: resetPaginationSafe,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}
