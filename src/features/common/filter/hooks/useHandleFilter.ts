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
import { injectReducer } from "@/store";
import reducer from "@/features/common/filter/store";
import { FILTER } from "@/features/common/filter/constants";
import { selectFilterStoreKey } from "@/features/common/filter/store/selectors"

interface IUseFilterParams {
    storeKey: string;
    options?: readonly Filter[];
}

export function useHandleFilter({ storeKey, options }: IUseFilterParams) {
    injectReducer(`${FILTER}_${storeKey}`, reducer);
    const dispatch = useAppDispatch();
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
