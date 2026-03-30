"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { apiSignIn } from "@/services/AuthService";
import { IUser } from "@/interfaces/user";

type SignInResponse = {
  message?: string;
  token?: string;
  user?: unknown;
};

export function useSignIn() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signIn = async (values: IUser) => {
    try {
      setIsSubmitting(true);

      const response = (await apiSignIn(values)) as { data: SignInResponse };
      const message = response.data?.message || "Signed in successfully.";

      toast.success(message);
      router.push("/");
      router.refresh();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Sign in failed. Please try again.";

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
