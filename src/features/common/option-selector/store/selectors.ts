import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { OPTION_SELECTOR } from "@/features/common/option-selector/constants"

export const makeSelectOptionsState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${OPTION_SELECTOR}_${storeKey}`] ? state[`${OPTION_SELECTOR}_${storeKey}`].state : null,
        (optionState) => ({
            options: optionState?.options || [],
            option_idx: (optionState?.selectedOptions
                .filter((item: number) => item !== null)),
            validationErrors: optionState?.validationErrors || [],
            optionsCount: optionState?.options.length || 0
        })
    );

const optionsSelectorsCache: Record<string, ReturnType<typeof makeSelectOptionsState>> = {};

export const selectOptionsStoreKey = (storeKey: string) => {
    if (!optionsSelectorsCache[storeKey]) {
        optionsSelectorsCache[storeKey] = makeSelectOptionsState(storeKey);
    }
    return optionsSelectorsCache[storeKey];
};