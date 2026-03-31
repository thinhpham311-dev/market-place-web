"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReviewStars from "@/features/reviews/components/ReviewStars";
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
  const rating = spu?.product_ratingsAverange ?? 0;

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-0">
        <ReviewStars readOnly data={rating} />
      </CardContent>
    </Card>
  );
}
