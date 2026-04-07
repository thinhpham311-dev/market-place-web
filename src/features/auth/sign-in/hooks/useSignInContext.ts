import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { SignInContext } from "@/features/auth/sign-in/providers";

export function useSignInContext() {
  return useContextSafe(SignInContext, "SignInProvider");
}
