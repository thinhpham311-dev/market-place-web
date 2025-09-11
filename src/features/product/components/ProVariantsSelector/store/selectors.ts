import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { VARIANT_SELECTOR } from "../constants"

export const makeSelectVariantsState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${VARIANT_SELECTOR}_${storeKey}`] ? state[`${VARIANT_SELECTOR}_${storeKey}`].state : null,
        (variantState) => ({
            variants: variantState?.variants || [],
            sku_tier_idx: (variantState?.selectedOptions
                .filter((item: number) => item !== null)
                .join(",")) || "",
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