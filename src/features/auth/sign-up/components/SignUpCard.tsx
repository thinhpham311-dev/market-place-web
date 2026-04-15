"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/hooks";

import SignUpForm from "./SignUpForm";

export default function SignUpCard() {
  const { t } = useTranslation();
  return (
    <Card className="mx-auto w-full px-3 py-10">
      <CardHeader className="flex flex-row items-center justify-start gap-x-3 px-0 md:px-12">
        <CardTitle>{t("sign_up")}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 md:px-12">
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
