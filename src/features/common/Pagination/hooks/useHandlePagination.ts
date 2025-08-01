import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    setPage,
    setTotalPages,
    resetPagination,
    setLimit,
} from "@/features/common/pagination/store/stateSlice";
import { selectPaginationByStoreKey } from "@/features/common/pagination/store/selectors";
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/pagination/store";
import { PAGINATION } from "../constants";

interface IUseHandlePaginationProps {
    initialTotal?: number;
    initialLimit?: number;
    siblingCount?: number;
    storeKey: string;
}

export function useHandlePagination({
    initialTotal = 0,
    initialLimit = 0,
    siblingCount = 1,
    storeKey,
}: IUseHandlePaginationProps) {

    const dispatch = useAppDispatch();
    useEffect(() => {
        const reducerKey = `${PAGINATION}_${storeKey}`;
        injectReducer(reducerKey, reducer);

        return () => {
            dispatch(resetPagination())
            removeReducer(reducerKey);
        };
    }, [storeKey, dispatch]);


    const { currentPage, totalPages, limit: storeLimit } = useAppSelector(
        selectPaginationByStoreKey(storeKey)
    );


    // Set limit and total pages when totalItems or limit changes
    useEffect(() => {
        if (initialLimit) {
            dispatch(setLimit(initialLimit)); // Automatically resets currentPage to 1
        }

        if (initialTotal && initialLimit) {
            const totalPageCount = Math.ceil(initialTotal / initialLimit);
            dispatch(setTotalPages(totalPageCount));
        }
    }, [initialLimit, initialTotal, dispatch]);

    const DOTS = "...";

    const paginationRange = useMemo(
        () => calculatePaginationRange(currentPage, totalPages, siblingCount, DOTS),
        [totalPages, currentPage, siblingCount]
    );


    const setPageSafe = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            dispatch(setPage(page));
        }
    };

    const resetPaginationSafe = () => {
        dispatch(resetPagination());
    };

    return {
        currentPage,
        totalPages,
        totalItems: initialTotal,
        perPage: storeLimit,
        pages: paginationRange,
        setPage: setPageSafe,
        resetPagination: resetPaginationSafe,
        hasPrev: currentPage > 1,
        hasNext: currentPage < totalPages,
    };
}

function calculatePaginationRange(
    currentPage: number,
    totalPages: number,
    siblingCount: number,
    DOTS: string
): (number | string)[] {

    const totalPageNumbers = siblingCount * 2 + 5;
    const firstPage = 1;
    const lastPage = totalPages;

    if (totalPageNumbers >= totalPages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 2);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (!showLeftDots && showRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        return [
            ...Array.from({ length: leftItemCount }, (_, i) => i + 1),
            DOTS,
            totalPages,
        ];
    }

    if (showLeftDots && !showRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        return [
            firstPage,
            DOTS,
            ...Array.from(
                { length: rightItemCount },
                (_, i) => totalPages - rightItemCount + 1 + i
            ),
        ];
    }

    if (showLeftDots && showRightDots) {
        return [
            firstPage,
            DOTS,
            ...Array.from(
                { length: rightSibling - leftSibling + 1 },
                (_, i) => leftSibling + i
            ),
            DOTS,
            lastPage,
        ];
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
}
