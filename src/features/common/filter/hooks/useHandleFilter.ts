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
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/filter/store";
import { FILTER } from "@/features/common/filter/constants";
import { selectFilterStoreKey } from "@/features/common/filter/store/selectors"

interface IUseFilterParams {
    storeKey: string;
    options?: readonly Filter[];
}

export function useHandleFilter({ storeKey, options }: IUseFilterParams) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const reducerKey = `${FILTER}_${storeKey}`;
        injectReducer(reducerKey, reducer);

        return () => {
            dispatch(resetAllFilters())
            removeReducer(reducerKey);
        };
    }, [storeKey, dispatch]);

    const { filter, data } = useAppSelector(selectFilterStoreKey(storeKey));
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
        data,
        filter,
        handleSetFilter,
        handleResetFilter,
        handleResetAllFilters,
    };
}
