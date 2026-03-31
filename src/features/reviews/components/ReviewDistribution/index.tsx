// src/components/product/review/ReviewDistribution/index.tsx
"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import AverageRating from "./AverageRating";
import RatingDistributionList from "./RatingDistributionList";
import { Review } from "../../types";
import { useTranslation } from "@/lib/hooks/use-translation";

interface IReviewDistributionProps {
  data: Review[];
}

const ReviewDistribution = ({ data }: IReviewDistributionProps) => {
  const { t } = useTranslation();
  console.log("Review Distribution Data:", data);
  return (
    <Card className="md:p-5 p-3 space-y-6 sticky top-[70px] rounded-none">
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-bold">{t("review_average_rating")}</CardTitle>
        <AverageRating data={data} />
      </CardHeader>
      <CardContent className="p-0 space-y-2">
        <CardTitle className="text-lg font-bold">{t("review_distribution")}:</CardTitle>
        <RatingDistributionList data={data} />
      </CardContent>
    </Card>
  );
};

export default ReviewDistribution;
