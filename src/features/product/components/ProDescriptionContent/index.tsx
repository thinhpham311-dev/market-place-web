"use client";
import React, { memo } from "react";
import { Card, CardTitle, CardDescription, CardContent, CardHeader } from "@/components/ui/card";
import { useSpuDetailData } from "@/features/spu/hooks";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useTranslation } from "@/lib/hooks/use-translation";

function ProDescriptionContent() {
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
        <CardTitle className="text-background font-title">{t("product_description_title")}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">{content}</CardContent>
    </Card>
  );
}

export default memo(ProDescriptionContent);
