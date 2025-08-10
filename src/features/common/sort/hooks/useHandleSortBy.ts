"use client";

import { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSortBy, resetSortBy } from "../store/stateSlice";
import type { Sort } from "../types";
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/sort/store";
import { SORT } from "@/features/common/sort/constants"
import { selectSortByStoreKey } from "@/features/common/sort/store/selectors";

interface IUseSortBy {
    options: readonly Sort[] | undefined
    storeKey: string;
}

export function useSortBy({
    options,
    storeKey
}: IUseSortBy) {

    const dispatch = useAppDispatch();
    useLayoutEffect(() => {
        const reducerKey = `${SORT}_${storeKey}`;
        injectReducer(reducerKey, reducer);

        return () => {
            dispatch(resetSortBy())
            removeReducer(reducerKey);
        };
    }, [storeKey, dispatch]);

    const { sortBy } = useAppSelector(
        selectSortByStoreKey(storeKey)
    );

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
