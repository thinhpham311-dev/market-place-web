"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectDataTableStoreKey } from "@/features/common/data-table/store/selectors";
import { createDefault, IDataTable } from "@/features/common/data-table/store/initials";
import { DATA_TABLE } from "@/features/common/data-table/constants"

interface IGetDataTableValue {
    reducerKey?: string,
    storeKey: string,
    initialValue?: IDataTable
}

export const useGetDataTableValue = ({
    reducerKey = DATA_TABLE,
    storeKey,
    initialValue = createDefault()
}: IGetDataTableValue) => {

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
