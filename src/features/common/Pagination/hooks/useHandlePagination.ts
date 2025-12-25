import { useLayoutEffect, useEffect, useMemo, useRef, useCallback } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
    setPage,
    setInitialValue,
    resetPagination,
} from "@/features/common/pagination/store/stateSlice";
import { useGetPaginationValue } from "@/features/common/pagination/hooks";
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/pagination/store";
import { IPaginationState } from "@/features/common/pagination/store/initials"

interface IUseHandlePaginationProps {
    reducerKey: string;
    initialValue: IPaginationState
    siblingCount?: number;
    storeKey: string;
}
const DOTS = "...";

export function useHandlePagination({
    reducerKey,
    storeKey,
    initialValue,
    siblingCount = 1,
}: IUseHandlePaginationProps) {
    const initializedRef = useRef(false);
    const { } = initialValue
    const dispatch = useAppDispatch();
    useLayoutEffect(() => {
        injectReducer(reducerKey, reducer);

        return () => {
            removeReducer(reducerKey);
        };
    }, [reducerKey]);

    useEffect(() => {
        if (!initializedRef.current && initialValue) {
            dispatch(setInitialValue({ storeKey, initialValue }));
            initializedRef.current = true
        }
    }, [dispatch, storeKey, initialValue]);


    const state = useGetPaginationValue({ reducerKey, storeKey, initialValue });
    const { currentPage, totalPages } = state


    const paginationRange = useMemo(
        () => calculatePaginationRange(currentPage, totalPages, siblingCount, DOTS),
        [totalPages, currentPage, siblingCount]
    );


    const setPageSafe = useCallback((page: number) => {
        if (page >= 1 && page <= totalPages) {
            dispatch(setPage({ storeKey, page }));
        }
    }, [dispatch, storeKey])

    const resetPaginationSafe = useCallback(() => {
        dispatch(resetPagination({ storeKey }));
    }, [dispatch, storeKey]);

    return {
        ...state,
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
