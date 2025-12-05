"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectDataTableStoreKey } from "@/features/common/data-table/store/selectors";
import { IDataTable } from "@/features/common/data-table/store/initial";

export const useGetDataTableValue = (
    reducerKey: string,
    storeKey: string,
    defaultValue: IDataTable
) => {
    const state = useAppSelector(
        selectDataTableStoreKey(reducerKey, storeKey)
    );

    return state ?? defaultValue;
};
