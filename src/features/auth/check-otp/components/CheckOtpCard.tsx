"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/hooks";

import CheckOtpForm from "./CheckOtpForm";

type CheckOtpCardProps = {
  email?: string;
};

export default function CheckOtpCard({ email = "" }: CheckOtpCardProps) {
  const { t } = useTranslation();
  return (
    <Card className="mx-auto w-full p-3 md:w-1/2 md:p-6 lg:w-1/3">
      <CardHeader className="px-0 md:px-12">
        <CardTitle>{t("verify_email_otp")}</CardTitle>
        <CardDescription>{t("verify_email_otp_desc")}</CardDescription>
      </CardHeader>
      <CardContent className="px-0 md:px-12">
        <CheckOtpForm email={email} />
      </CardContent>
    </Card>
  );
}
