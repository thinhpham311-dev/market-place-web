"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
    setInitialFilter,
    setFilter,
    resetFilter,
    resetAllFilters,
} from "../store/stateSlice";
import { IFilterState } from "@/features/common/filter/store/initials";
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/filter/store";
import { useGetFilterValue } from "@/features/common/filter/hooks";

interface IUseFilterParams {
    reducerKey: string;
    storeKey: string;
    initialValue: IFilterState;
}

export function useHandleFilter({
    reducerKey,
    storeKey,
    initialValue,
}: IUseFilterParams) {
    const dispatch = useAppDispatch();
    const initializedRef = useRef(false);

    useEffect(() => {
        injectReducer(reducerKey, reducer);
        return () => removeReducer(reducerKey);
    }, [reducerKey]);

    const state = useGetFilterValue({
        reducerKey,
        storeKey,
        initialValue,
    });

    useEffect(() => {
        if (!initializedRef.current && initialValue) {
            dispatch(
                setInitialFilter({
                    storeKey,
                    initialValue,
                })
            );
            initializedRef.current = true;
        }
    }, [dispatch, storeKey, initialValue]);

    const handleSetFilter = useCallback(
        <T = unknown>(key: string, value: T) => {
            dispatch(setFilter({ storeKey, key, value }));
        },
        [dispatch, storeKey]
    );

    const handleResetFilter = useCallback(
        (key: string) => {
            dispatch(resetFilter({ storeKey, key }));
        },
        [dispatch, storeKey]
    );

    const handleResetAllFilters = useCallback(() => {
        dispatch(resetAllFilters({ storeKey }));
    }, [dispatch, storeKey]);

    return {
        ...state,
        handleSetFilter,
        handleResetFilter,
        handleResetAllFilters,
    };
}
