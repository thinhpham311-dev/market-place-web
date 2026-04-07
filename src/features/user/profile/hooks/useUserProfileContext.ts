import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { UserProfileContext } from "@/features/user/profile/providers";

export function useUserProfileContext() {
  return useContextSafe(UserProfileContext, "UserProfileProvider");
}
