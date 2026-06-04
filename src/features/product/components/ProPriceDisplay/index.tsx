"use client";

import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { useSpuDetailData } from "@/features/spu/hooks";

import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import ProSkuPriceDisplay from "./ProSkuPriceDisplay";
import { useTranslation } from "@/lib/hooks/use-translation";

function ProPriceDisplay() {
  const { t } = useTranslation();
  const { spu, showLoading, showError, showNotFound, errorMessage } = useSpuDetailData();

  if (showLoading) {
    return <LoadingSkeleton />;
  }

  if (showError) {
    return <NotFound message={errorMessage || t("common_something_went_wrong")} />;
  }

  if (showNotFound) {
    return <NotFound message={t("common_no_data_found")} />;
  }

  return (
    <Card className="border-none shadow-none rounded-none bg-sidebar-primary-foreground">
      <CardContent className="p-3 flex flex-col gap-1">
        <ProSkuPriceDisplay spu={spu} />
      </CardContent>
    </Card>
  );
}

export default memo(ProPriceDisplay);
