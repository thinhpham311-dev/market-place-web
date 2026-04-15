"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/hooks";

import SignInForm from "./SignInForm";

export default function SignInCard() {
  const { t } = useTranslation();
  return (
    <Card className="mx-auto w-full px-3 py-10">
      <CardHeader className="flex flex-row items-center justify-start gap-x-3 px-0 md:px-12">
        <CardTitle>{t("sign_in")}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 md:px-12">
        <SignInForm />
      </CardContent>
    </Card>
  );
}
