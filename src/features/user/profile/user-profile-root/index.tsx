"use client";

import UpdateProfileCard from "@/features/user/profile/components/UpdateProfileCard";
import UserProfileProvider from "@/features/user/profile/providers";
import { useFetchData } from "@/features/user/profile/hooks/useFetchData";

export default function UserProfileRoot() {
  const profileData = useFetchData();

  return (
    <UserProfileProvider
      contextValues={{
        profile: profileData.profile,
        formDefaults: profileData.formDefaults,
        loading: profileData.loading,
        error: profileData.error,
        status: profileData.status,
      }}
    >
      <UpdateProfileCard />
    </UserProfileProvider>
  );
}
