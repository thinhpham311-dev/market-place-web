import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { CHECK_OTP_KEY } from "@/features/auth/check-otp/constants";

export const makeSelectCheckOtpState = (storeKey: string) =>
  createSelector(
    (state: RootState) => state[`${CHECK_OTP_KEY}_${storeKey}`]?.data ?? null,
    (data) => ({
      user: data?.user,
      hasSession: data?.hasSession,
      message: data?.message,
      loading: data?.loading,
      error: data?.error,
      status: data?.status,
    }),
  );

const MAX_CACHE_SIZE = 100;
const cache: Record<string, ReturnType<typeof makeSelectCheckOtpState>> = {};
const cacheKeys: string[] = [];

export const selectCheckOtpByStoreKey = (storeKey: string) => {
  if (!cache[storeKey]) {
    cache[storeKey] = makeSelectCheckOtpState(storeKey);
    cacheKeys.push(storeKey);

    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) {
        delete cache[oldestKey];
      }
    }
  }

  return cache[storeKey];
};
