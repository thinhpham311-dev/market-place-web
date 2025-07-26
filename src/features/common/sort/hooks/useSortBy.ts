"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSortBy, resetSortBy } from "../store/stateSlice";
import type { Sort } from "../types";

export function useSortBy(
    options: readonly Sort[] | undefined
) {
    const dispatch = useAppDispatch();
    const { sortBy } = useAppSelector((state) => state.sortBy.state);

    const handleSortChange = (value: Sort) => {
        dispatch(setSortBy(value));
    };

    const handleResetSort = () => {
        dispatch(resetSortBy());
    };

    return {
        sortBy,
        setSortBy: handleSortChange,
        resetSortBy: handleResetSort,
        options, // ✅ trả ra luôn options để map trong UI
    };
}
