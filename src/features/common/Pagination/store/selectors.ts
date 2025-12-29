import { RootState } from "@/store";

export const makeSelectPaginationState =
  (reducerKey: string, storeKey: string) => (state: RootState) =>
    state[reducerKey]?.state[storeKey];

const selectorCache: Record<
  string,
  Record<string, ReturnType<typeof makeSelectPaginationState>>
> = {};

export const selectPaginationSeletor = (reducerKey: string, storeKey: string) => {
  if (!selectorCache[reducerKey]) {
    selectorCache[reducerKey] = {};
  }
  if (!selectorCache[reducerKey][storeKey]) {
    selectorCache[reducerKey][storeKey] = makeSelectPaginationState(reducerKey, storeKey);
  }
  return selectorCache[reducerKey][storeKey];
};
