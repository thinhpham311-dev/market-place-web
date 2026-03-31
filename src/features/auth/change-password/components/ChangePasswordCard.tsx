"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/hooks";

import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePasswordCard() {
  const { t } = useTranslation();
  return (
    <Card className="mx-auto w-full p-3 md:w-1/2 md:p-6 lg:w-1/3">
      <CardHeader className="flex flex-row items-center justify-start gap-x-3 px-0 md:px-12">
        <CardTitle>{t("change_password")}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 md:px-12">
        <ChangePasswordForm />
      </CardContent>
    </Card>
  );
}
