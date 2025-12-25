import { RootState } from "@/store";

export const makeSelectSortState = (reducerKey: string, storeKey: string) => (state: RootState) =>
    state[reducerKey]?.state?.[storeKey]


const selectorCache: Record<
    string,
    Record<string, ReturnType<typeof makeSelectSortState>>
> = {};

export const selectSortBySelector = (reducerKey: string, storeKey: string) => {
    if (!selectorCache[reducerKey]) {
        selectorCache[reducerKey] = {};
    }

    if (!selectorCache[reducerKey][storeKey]) {
        selectorCache[reducerKey][storeKey] = makeSelectSortState(reducerKey, storeKey);
    }

    return selectorCache[reducerKey][storeKey];
};
