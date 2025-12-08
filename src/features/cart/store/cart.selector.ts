import { RootState } from "@/store";
import { SHOPPING_CART } from "../constants";

type SelectorFn = (state: RootState) => any;

const selectorCache: Record<string, SelectorFn> = {};

// Selector gốc
const makeSelector = (storeKey: string): SelectorFn => {
    return (state: RootState) =>
        state[`${SHOPPING_CART}_${storeKey}`];
};

// Public API
export const selectShoppingCart = (storeKey: string): SelectorFn => {
    if (!selectorCache[storeKey]) {
        selectorCache[storeKey] = makeSelector(storeKey);
    }
    return selectorCache[storeKey];
};
