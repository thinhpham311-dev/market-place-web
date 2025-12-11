import { RootState } from "@/store";
import { SHOPPING_CART } from "@/features/cart/constants";


/**
 * Base selector — return primitive only to avoid rerenders
 */
const makeShoppingCartBase = (dynamicReducerKey: string, storeKey: string) =>
    (state: RootState) =>
        state[`${SHOPPING_CART}_${dynamicReducerKey}`]?.cart?.[storeKey];

/**
 * Cache theo dạng:
 * selectorCache[reducerKey][storeKey]
 */
const selectorCache: Record<
    string,
    Record<string, ReturnType<typeof makeShoppingCartBase>>
> = {};

/**
 * Public API — ALWAYS use reducerKey, not reducerKey
 */
export const selectShoppingCart = (
    dynamicReducerKey: string,
    storeKey: string
) => {
    if (!selectorCache[dynamicReducerKey]) {
        selectorCache[dynamicReducerKey] = {};
    }

    if (!selectorCache[dynamicReducerKey][storeKey]) {
        selectorCache[dynamicReducerKey][storeKey] =
            makeShoppingCartBase(dynamicReducerKey, storeKey);
    }

    return selectorCache[dynamicReducerKey][storeKey];
};
