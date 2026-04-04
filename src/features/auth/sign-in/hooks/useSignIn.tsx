"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { apiSignIn } from "@/services/AuthService";
import { IUser } from "@/interfaces/user";
import { onSignInSuccess } from "@/store/auth/sessionSlice";
import { setUser } from "@/store/auth/userSlice";
import { useTranslation } from "@/lib/hooks/use-translation";

type SignInResponse = {
  message?: string;
  token?: string;
  user?: any;
  hasSession?: boolean;
};

export function useSignIn() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signIn = async (values: IUser) => {
    try {
      setIsSubmitting(true);

      const response = (await apiSignIn(values)) as { data: SignInResponse };
      const message = response.data?.message || t("auth_sign_in_success");

      if (response.data?.hasSession || response.data?.token) {
        dispatch(onSignInSuccess(response.data?.token || "http-only-session"));
      }

      if (response.data?.user) {
        dispatch(setUser(response.data.user));
      }

      toast.success(message);
      router.push("/");
      router.refresh();
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || t("auth_sign_in_failed");

      toast.error(message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    signIn,
    isSubmitting,
  };
}
