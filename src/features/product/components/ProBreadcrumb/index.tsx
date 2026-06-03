"use client";
import React, { memo } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import BreadcrumbItem from "./BreadcrumbItem";
import { useSpuContext } from "@/features/spu/hooks";
import { breadcrumbs } from "@/features/product/constants";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useTranslation } from "@/lib/hooks/use-translation";

function ProBreadcrumb() {
  const { t } = useTranslation();
  const { spu, loading, error } = useSpuContext((state) => ({
    spu: state.spu,
    loading: state.loading,
    error: state.error,
  }));
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
