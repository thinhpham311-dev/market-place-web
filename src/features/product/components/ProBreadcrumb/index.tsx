"use client";
import React, { memo } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import BreadcrumbItem from "./BreadcrumbItem";
import { useSpuDetailData } from "@/features/spu/hooks";
import { breadcrumbs } from "@/features/product/constants";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useTranslation } from "@/lib/hooks/use-translation";

function ProBreadcrumb() {
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

  const breadcrumbsList = breadcrumbs(spu ?? undefined, t("product_breadcrumb_home"));
  if (!breadcrumbsList || breadcrumbsList.length === 0) {
    return (
      <CardContent className="p-3">
        <CardDescription>{t("common_no_data_found")}</CardDescription>
      </CardContent>
    );
  }
  return (
    <Card className=" rounded-none">
      <CardContent className="p-0">
        {breadcrumbsList.map((breadcrumb, index) => (
          <BreadcrumbItem
            key={index}
            label={breadcrumb.label}
            value={breadcrumb.value}
            hasSeparator={index < breadcrumbsList.length - 1}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default memo(ProBreadcrumb);
