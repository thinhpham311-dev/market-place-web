// store/dynamicInitMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";
import { dynamicInitRegistry } from "@/registry/dynamicInitRegistry";

export const dynamicInitMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);

  const ensureInit = action.meta?.ensureInit;
  if (!Array.isArray(ensureInit)) return result;

  const { key } = action.payload ?? {};
  if (!key) return result;

  const state = store.getState();
  ensureInit.forEach((sliceName: string) => {
    const slice = dynamicInitRegistry[sliceName];
    if (!slice) return;

    const sliceState = slice.selector(state);
    if (!sliceState?.[key]) {
      store.dispatch(slice.initAction({ key }));
    }
  });

  return result;
};
