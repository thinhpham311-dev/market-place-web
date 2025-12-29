import { RootState } from "@/store";

export const makeSelectFilterState = (reducerKey: string, storeKey: string) => (state: RootState) =>
  state[reducerKey]?.state?.[storeKey];

const selectorCache: Record<string, Record<string, ReturnType<typeof makeSelectFilterState>>> = {};

export const selectFilterSelector = (reducerKey: string, storeKey: string) => {
  if (!selectorCache[reducerKey]) {
    selectorCache[reducerKey] = {};
  }

  if (!selectorCache[reducerKey][storeKey]) {
    selectorCache[reducerKey][storeKey] = makeSelectFilterState(reducerKey, storeKey);
  }

  return selectorCache[reducerKey][storeKey];
};
