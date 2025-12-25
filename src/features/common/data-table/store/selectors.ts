import { RootState } from "@/store";

export const makeSelectDataTableState = (reducerKey: string, storeKey: string) =>
    (state: RootState) => state[reducerKey]?.state[storeKey]


const selectorCache: Record<
    string,
    Record<string, ReturnType<typeof makeSelectDataTableState>>
> = {};


export const selectDataTableStoreKey = (reducerKey: string, storeKey: string) => {
    if (!selectorCache[reducerKey]) {
        selectorCache[reducerKey] = {};
    }
    if (!selectorCache[reducerKey][storeKey]) {
        selectorCache[reducerKey][storeKey] = makeSelectDataTableState(reducerKey, storeKey);
    }
    return selectorCache[reducerKey][storeKey];
};