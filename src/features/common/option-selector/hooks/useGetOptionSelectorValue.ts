"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectOptionsSelector } from "@/features/common/option-selector/store/selectors";
import { IOption } from "@/features/common/option-selector/store/initial";

export const useGetOptionSelectorValue = (
    reducerKey: string,
    storeKey: string,
    defaultValue: IOption
) => {
    const state = useAppSelector(
        selectOptionsSelector(reducerKey, storeKey)
    );

    return useMemo(() => {
        const options = state?.options ?? defaultValue.options;
        const selected = state?.selectedOptions ?? defaultValue.selectedOptions;

        return {
            ...(state ?? defaultValue),

            optionsCount: options.length,
            selectedOptions: selected.filter((v: number) => v !== null),
        };
    }, [state]);
};
