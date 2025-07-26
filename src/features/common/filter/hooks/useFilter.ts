"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    initialFilter,
    setFilter,
    resetFilter,
    resetAllFilters,
} from "../store/stateSlice";
import { Filter } from "@/features/common/filter/types";

export function useFilter(options?: Filter) {
    const dispatch = useAppDispatch();
    const { filters } = useAppSelector((state) => state.filter.state as Filter);
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current && options) {
            dispatch(initialFilter(options as Filter[]));
            initialized.current = true;
        }
    }, [dispatch, options]);

    const handleSetFilter = (key: string, value: any) =>
        dispatch(setFilter({ key, value }));

    const handleResetFilter = (key: string) => dispatch(resetFilter(key));

    const handleResetAllFilters = () => dispatch(resetAllFilters());

    return {
        filters,
        handleSetFilter,
        handleResetFilter,
        handleResetAllFilters,
    };
}
