export const withEnsureInit = (action: any, ensureInit: string[]) => ({
  ...action,
  meta: {
    ...(action.meta ?? {}),
    ensureInit,
  },
});
