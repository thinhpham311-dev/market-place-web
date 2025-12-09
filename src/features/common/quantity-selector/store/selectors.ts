import { RootState } from "@/store";

/**
 * Base selector — return primitive only to avoid rerenders
 */
const makeQuantityBaseSelector = (dynamicReducerKey: string, storeKey: string) =>
    (state: RootState) =>
        state[dynamicReducerKey]?.state?.[storeKey]?.quantity ?? 0;

/**
 * Cache theo dạng:
 * selectorCache[dynamicReducerKey][storeKey]
 */
const selectorCache: Record<
    string,
    Record<string, ReturnType<typeof makeQuantityBaseSelector>>
> = {};

/**
 * Public API — ALWAYS use dynamicReducerKey, not reducerKey
 */
export const selectQuantitySelector = (
    dynamicReducerKey: string,
    storeKey: string
) => {
    if (!selectorCache[dynamicReducerKey]) {
        selectorCache[dynamicReducerKey] = {};
    }

    if (!selectorCache[dynamicReducerKey][storeKey]) {
        selectorCache[dynamicReducerKey][storeKey] =
            makeQuantityBaseSelector(dynamicReducerKey, storeKey);
    }

    return selectorCache[dynamicReducerKey][storeKey];
};
