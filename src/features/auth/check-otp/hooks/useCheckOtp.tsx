"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-storeIO";
import reducer from "@/features/auth/check-otp/store";
import { injectReducer, removeReducer } from "@/store";
import { CHECK_OTP_DEFAULT_STORE_KEY, CHECK_OTP_KEY } from "@/features/auth/check-otp/constants";
import { selectCheckOtpByStoreKey } from "@/features/auth/check-otp/store/selectors";
import { postVerifyEmailOtp } from "@/features/auth/check-otp/store/dataSlice";
import { onSignInSuccess } from "@/store/auth/sessionSlice";
import { setUser } from "@/store/auth/userSlice";
import type { VerifyEmailOtpPayload } from "@/features/auth/types/auth";
import { useTranslation } from "@/lib/hooks/use-translation";

export function useCheckOtp() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeKey = CHECK_OTP_DEFAULT_STORE_KEY;

  useEffect(() => {
    const reducerKey = `${CHECK_OTP_KEY}_${storeKey}`;
    injectReducer(reducerKey, reducer);

    return () => {
      removeReducer(reducerKey);
    };
  }, [storeKey]);

  const { loading: isSubmitting = false } = useAppSelector(selectCheckOtpByStoreKey(storeKey));

  const verifyOtp = async (values: VerifyEmailOtpPayload) => {
    try {
      const response = await dispatch(postVerifyEmailOtp(values) as any).unwrap();
      const message = response.message || t("auth_check_otp_success");

      if (response.hasSession || response.token) {
        dispatch(onSignInSuccess(response.token || "http-only-session"));
      }

      if (response.user) {
        dispatch(setUser(response.user));
      }

      toast.success(message);
      router.push(response.hasSession || response.token ? "/" : "/user/sign-in");
      router.refresh();
    } catch (error: any) {
      const message =
        (typeof error === "string" && error) ||
        error?.message ||
        error?.response?.data?.message ||
        t("auth_check_otp_failed");

      toast.error(message);
      throw error;
    }
  };

  return {
    verifyOtp,
    isSubmitting,
  };
}
