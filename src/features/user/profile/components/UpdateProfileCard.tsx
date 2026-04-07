"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/hooks";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import NotFound from "@/components/layout/notfound";
import { useUserProfileContext } from "@/features/user/profile/hooks/useUserProfileContext";

import UpdateProfileForm from "./UpdateProfileForm";

export default function UpdateProfileCard() {
  const { t } = useTranslation();
  const { loading, error, status } = useUserProfileContext();

  return (
    <Card className="mx-auto w-full p-3 md:p-6">
      <CardHeader className="flex flex-row items-center justify-start gap-x-3 px-0 md:px-12">
        <CardTitle>{t("update_profile_user")}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 md:px-12">
        {loading ? (
          <div className="flex min-h-40 items-center justify-center gap-3">
            <LoadingSpinner />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : status === "error" ? (
          <NotFound message={error} />
        ) : (
          <UpdateProfileForm />
        )}
      </CardContent>
    </Card>
  );
}
