import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPage, setTotalPages, resetPagination, setLimit } from "../store/stateSlice";

interface UsePaginationProps {
    totalItems: number;
    limit?: number;
    siblingCount?: number;
}

export function usePagination({
    totalItems,
    limit = 0,
    siblingCount = 1,
}: UsePaginationProps) {
    const dispatch = useAppDispatch();
    const { currentPage, totalPages, limit: storeLimit } = useAppSelector(
        (state) => state.pagination.state
    );

    useEffect(() => {
        if (storeLimit !== limit) {
            dispatch(setLimit(limit));
        }
    }, [limit, storeLimit, dispatch]);

    useEffect(() => {
        if (totalItems > 0) {
            const total = Math.ceil(totalItems / limit);
            dispatch(setTotalPages(total));
        }
    }, [totalItems, limit, dispatch]);

    const DOTS = "...";

    const paginationRange = useMemo(() => {
        if (totalPages <= 1) return [];

        const totalPageNumbers = siblingCount * 2 + 5;

        if (totalPageNumbers >= totalPages) {
            return Array.from({ length: totalPages }, (_, i) => i);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 2);

        const shouldShowLeftDots = leftSiblingIndex > 1;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 0;
        const lastPageIndex = totalPages - 1;

        let pages: (number | string)[] = [];

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            pages = [
                ...Array.from({ length: leftItemCount }, (_, i) => i),
                DOTS,
                lastPageIndex,
            ];
        } else if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            pages = [
                firstPageIndex,
                DOTS,
                ...Array.from(
                    { length: rightItemCount },
                    (_, i) => totalPages - rightItemCount + i
                ),
            ];
        } else if (shouldShowLeftDots && shouldShowRightDots) {
            pages = [
                firstPageIndex,
                DOTS,
                ...Array.from(
                    { length: rightSiblingIndex - leftSiblingIndex + 1 },
                    (_, i) => leftSiblingIndex + i
                ),
                DOTS,
                lastPageIndex,
            ];
        } else {
            pages = Array.from({ length: totalPages }, (_, i) => i);
        }

        return pages;
    }, [totalPages, currentPage, siblingCount]);

    const setPageSafe = (page: number) => {
        if (page < 0 || page >= totalPages) return;
        dispatch(setPage(page));
    };

    const resetPaginationSafe = () => {
        dispatch(resetPagination());
    };

    return {
        currentPage,
        totalPages,
        limit,
        pages: paginationRange,
        setPage: setPageSafe,
        resetPagination: resetPaginationSafe,
        hasPrev: currentPage > 0,
        hasNext: currentPage < totalPages - 1,
    };
}
