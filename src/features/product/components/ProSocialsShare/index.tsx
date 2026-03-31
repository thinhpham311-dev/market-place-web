"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SocialButton from "./SocialButton";
import { socials } from "@/features/product/constants";
import { useTranslation } from "@/lib/hooks/use-translation";

export default function SkuSocialsShare() {
  const { t } = useTranslation();

  return (
    <Card layout="horizontal" className="border-none shadow-none items-center space-x-3">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center">
          <span className="text-sm font-bold uppercase">{t("product_share")}:</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-x-1 p-0">
        {socials.map((item) => (
          <SocialButton key={item.label} label={item.label} link={item.link} icon={item.icon} />
        ))}
      </CardContent>
    </Card>
  );
}
