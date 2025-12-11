"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectDataTableStoreKey } from "@/features/common/data-table/store/selectors";
import { createDefault, IDataTable } from "@/features/common/data-table/store/initial";

export const useGetDataTableValue = (
    reducerKey: string,
    storeKey: string,
    initialValue: IDataTable = createDefault()
) => {

    const state = useAppSelector(
        selectDataTableStoreKey(reducerKey, storeKey)
    );

    return useMemo(() => {
        if (!state) {
            return initialValue
        }

        return state
    }, [state, initialValue]);
};
