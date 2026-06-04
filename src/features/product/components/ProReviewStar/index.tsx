"use client";
import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReviewStars from "@/features/reviews/components/ReviewStars";
import { useSpuDetailData } from "@/features/spu/hooks";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useTranslation } from "@/lib/hooks/use-translation";

function ProReviewStar() {
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
  const rating = spu?.product_ratingsAverange ?? 0;

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-0">
        <ReviewStars readOnly data={rating} />
      </CardContent>
    </Card>
  );
}

export default memo(ProReviewStar);
