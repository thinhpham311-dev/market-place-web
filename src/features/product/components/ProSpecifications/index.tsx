"use client";

import React, { memo } from "react";
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import SpecificationItem from "./SpecificationItem";
import { useSpuDetailData } from "@/features/spu/hooks";
import { specs } from "@/features/product/constants";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useTranslation } from "@/lib/hooks/use-translation";

function ProSpecifications() {
  const { t } = useTranslation();
  const { spu, showLoading, showError, showNotFound, errorMessage } = useSpuDetailData();

  if (showLoading) {
    return <LoadingSkeleton />;
  }

  if (showError) {
    return <NotFound message={errorMessage} />;
  }

  if (showNotFound) {
    return <NotFound message={t("common_no_data_found")} />;
  }
  const specsList = specs(spu ?? undefined);

  if (!specsList || specsList.length === 0) {
    return (
      <CardContent className="p-3">
        <CardDescription>{t("product_no_specifications")}</CardDescription>
      </CardContent>
    );
  }
  return (
    <Card className="rounded-none">
      <CardTitle className="bg-sidebar-foreground text-background font-title p-3">
        {t("product_specifications")}
      </CardTitle>

      <CardContent className="p-0">
        {specsList.map((spec, index) => (
          <SpecificationItem
            key={index}
            label={spec.labelKey ? t(spec.labelKey) : ""}
            value={spec.value}
            hasSeparator={index < specsList.length - 1}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default memo(ProSpecifications);
