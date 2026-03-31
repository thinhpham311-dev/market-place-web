"use client";
import * as React from "react";
import { Card, CardTitle, CardDescription, CardContent, CardHeader } from "@/components/ui/card";
import { useSpuContext } from "@/features/spu/hooks";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useTranslation } from "@/lib/hooks/use-translation";

export default function ProDescriptionContent() {
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
  const description = spu?.product_description ?? "";

  let content: React.ReactElement;

  if (!description) {
    content = <CardDescription>{t("product_no_description")}</CardDescription>;
  } else if (typeof description === "string") {
    content = <CardDescription dangerouslySetInnerHTML={{ __html: description }} />;
  } else {
    content = <CardDescription>{description}</CardDescription>;
  }

  return (
    <Card className="rounded-none">
      <CardHeader className="bg-sidebar-foreground p-3">
        <CardTitle className="text-background">{t("product_description_title")}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">{content}</CardContent>
    </Card>
  );
}
