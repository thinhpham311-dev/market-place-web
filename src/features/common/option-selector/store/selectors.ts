import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { OPTION_SELECTOR } from "@/features/common/option-selector/constants"

export const makeSelectOptionsState = (reducerKey: string, storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${OPTION_SELECTOR}_${reducerKey}`]?.state[storeKey] ?? null,
        (optionState) => ({
            options: optionState?.options || [],
            option_idx: (optionState?.selectedOptions
                .filter((item: number) => item !== null)),
            validationErrors: optionState?.validationErrors || [],
            optionsCount: optionState?.options.length || 0
        })
    );

const selectorCache: Record<
    string,
    Record<string, ReturnType<typeof makeSelectOptionsState>>
> = {};


export const selectOptionsStoreKey = (reducerKey: string, storeKey: string) => {
    if (!selectorCache[reducerKey]) {
        selectorCache[reducerKey] = {};
    }
    if (!selectorCache[reducerKey][storeKey]) {
        selectorCache[reducerKey][storeKey] = makeSelectOptionsState(reducerKey, storeKey);
    }
    return selectorCache[reducerKey][storeKey];
};
