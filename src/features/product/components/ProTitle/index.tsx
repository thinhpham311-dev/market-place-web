"use client";

import React, { memo } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSpuDetailData } from "@/features/spu/hooks";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useTranslation } from "@/lib/hooks/use-translation";

function ProTitle() {
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
  const name = spu?.product_name ?? "";

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-3">
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
      </CardContent>
    </Card>
  );
}

export default memo(ProTitle);
