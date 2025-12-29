import { IShoppingCart, IState, ItemKey, ActionKey } from "@/features/cart/types";
import { NormalizedApiError } from "@/lib/http/handleAxiosError";

import { createDefault } from "@/features/cart/store/initial";
export const ensureStoreKeyState = (state: IState, storeKey: string): IShoppingCart => {
  if (!state[storeKey]) {
    state[storeKey] = createDefault();
  }
  return state[storeKey];
};

/* ---------- Ensure item loading ---------- */
export const ensureItemLoading = (state: IState, storeKey: string, key: string) => {
  const store = ensureStoreKeyState(state, storeKey);
  store.loading.byItem[key] ??= {};
};

export const ensureItemError = (state: IState, storeKey: string, key: string) => {
  const store = ensureStoreKeyState(state, storeKey);
  store.error.byItem[key] ??= {};
};

/* ---------- Set item loading ---------- */
export const setItemLoading = (
  state: IState,
  storeKey: string,
  id: string,
  key: ItemKey,
  value: boolean,
) => {
  ensureItemLoading(state, storeKey, id);
  state[storeKey].loading.byItem[id][key] = value;
};

/* ---------- Set action loading ---------- */
export const setActionLoading = (
  state: IState,
  storeKey: string,
  key: ActionKey,
  value: boolean,
) => {
  ensureStoreKeyState(state, storeKey);
  state[storeKey].loading.actions[key] = value;
};

/* ---------- Set global loading ---------- */
export const setGlobalLoading = (state: IState, storeKey: string, value: boolean) => {
  ensureStoreKeyState(state, storeKey);
  state[storeKey].loading.global = value;
};

/* ---------- Set item error ---------- */
export const setItemError = (
  state: IState,
  storeKey: string,
  id: string,
  key: ItemKey,
  value?: NormalizedApiError,
) => {
  ensureItemError(state, storeKey, id);
  state[storeKey].error.byItem[id][key] = value;
};

/* ---------- Set action error ---------- */
export const setActionError = (
  state: IState,
  storeKey: string,
  key: ActionKey,
  value?: NormalizedApiError,
) => {
  ensureStoreKeyState(state, storeKey);
  state[storeKey].error.actions[key] = value;
};

/* ---------- Set global error ---------- */
export const setGlobalError = (state: IState, storeKey: string, value?: NormalizedApiError) => {
  ensureStoreKeyState(state, storeKey);
  state[storeKey].error.global = value;
};
