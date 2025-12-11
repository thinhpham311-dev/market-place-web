"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectOptionsSelector } from "@/features/common/option-selector/store/selectors";
import { IOption, createDefault } from "@/features/common/option-selector/store/initial";

export const useGetOptionSelectorValue = (
    reducerKey: string,
    storeKey: string,
    initialValue: IOption = createDefault()
) => {
    const state = useAppSelector(
        selectOptionsSelector(reducerKey, storeKey)
    );

    return useMemo(() => {
        const options = state?.options ?? initialValue.options;
        const selected = state?.selectedOptions ?? initialValue.selectedOptions;

        return {
            ...(state ?? initialValue),

            optionsCount: options.length,
            selectedOptions: selected.filter((v: number) => v !== null),
        };
    }, [state]);
};
