"use client";

import SignInCard from "@/features/auth/sign-in/components/SignInCard";
import { useSignIn } from "@/features/auth/sign-in/hooks/useSignIn";
import SignInProvider from "@/features/auth/sign-in/providers";

export default function SignInRoot() {
  const signInData = useSignIn();

  return (
    <SignInProvider
        className="flex flex-1 w-auto mx-10"
      contextValues={{
        signIn: signInData.signIn,
        isSubmitting: signInData.isSubmitting,
      }}
    >
      <SignInCard />
    </SignInProvider>
  );
}
