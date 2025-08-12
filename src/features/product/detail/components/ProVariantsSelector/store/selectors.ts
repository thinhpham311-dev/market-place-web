import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { VARIANT_SELECTOR } from "../constants"
import { VariantOption } from "../types"

export const makeSelectVariantsState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${VARIANT_SELECTOR}_${storeKey}`] ? state[`${VARIANT_SELECTOR}_${storeKey}`].state : null,
        (variantState) => ({
            data: variantState?.data || [],
            selectedOptions: variantState?.selectedOptions,
            options: variantState?.selectedOptions.map((option: VariantOption) => {
                if (!option) return ""
                return option.value
            }),
            validationErrors: variantState?.validationErrors || []
        })
    );

const variantsSelectorsCache: Record<string, ReturnType<typeof makeSelectVariantsState>> = {};

export const selectVariantsStoreKey = (storeKey: string) => {
    if (!variantsSelectorsCache[storeKey]) {
        variantsSelectorsCache[storeKey] = makeSelectVariantsState(storeKey);
    }
    return variantsSelectorsCache[storeKey];
};