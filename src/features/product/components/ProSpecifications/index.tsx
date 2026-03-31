"use client";
import * as React from "react";
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import SpecificationItem from "./SpecificationItem";
import { useSpuContext } from "@/features/spu/hooks";
import { specs } from "@/features/product/constants";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useTranslation } from "@/lib/hooks/use-translation";

export default function ProSpecifications() {
  const { t } = useTranslation();
  const { spu, loading, error } = useSpuContext();
  const hasNoData = !spu || Object.keys(spu).length === 0;
  if (loading && hasNoData) {
    return <LoadingSkeleton />;
  }

  if (!loading && hasNoData && error) {
    return <NotFound message={error || t("common_something_went_wrong")} />;
  }

  if (!loading && hasNoData) {
    return <NotFound message={t("common_no_data_found")} />;
  }
  const specsList = specs(spu);

  if (!specsList || specsList.length === 0) {
    return (
      <CardContent className="p-3">
        <CardDescription>{t("product_no_specifications")}</CardDescription>
      </CardContent>
    );
  }
  return (
    <Card className="sticky top-[70px] left-0 rounded-none">
      <CardTitle className="bg-sidebar-foreground text-background p-3">
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
