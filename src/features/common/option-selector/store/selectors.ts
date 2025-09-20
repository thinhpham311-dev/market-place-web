import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { OPTION_SELECTOR } from "@/features/common/option-selector/constants"

export const makeSelectVariantsState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${OPTION_SELECTOR}_${storeKey}`] ? state[`${OPTION_SELECTOR}_${storeKey}`].state : null,
        (optionState) => ({
            options: optionState?.options || [],
            sku_tier_idx: (optionState?.selectedOptions
                .filter((item: number) => item !== null)),
            validationErrors: optionState?.validationErrors || [],
            optionsCount: optionState?.options.length || 0
        })
    );

const variantsSelectorsCache: Record<string, ReturnType<typeof makeSelectVariantsState>> = {};

export const selectVariantsStoreKey = (storeKey: string) => {
    if (!variantsSelectorsCache[storeKey]) {
        variantsSelectorsCache[storeKey] = makeSelectVariantsState(storeKey);
    }
    return variantsSelectorsCache[storeKey];
};