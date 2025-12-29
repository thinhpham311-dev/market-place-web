// src/components/product/review/ReviewDistribution/AverageRating.tsx
import React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import ReviewStars from "../ReviewStars";
import { Review } from "../../types";

interface IAverageRatingProps {
  data: Review[];
}

const AverageRating = ({ data }: IAverageRatingProps) => {
  const totalReviews = data?.length;

  const averageRating = React.useMemo(() => {
    const totalRating = data?.reduce((sum: number, review: Review) => sum + review.rating, 0);
    return totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : "0.0";
  }, [data]);

  return (
    <Card className="rounded-none">
      <CardContent className="p-0">
        <CardDescription className="inline-flex items-center space-x-3">
          <ReviewStars readOnly />
          <span>{averageRating} / 5</span>
          <span>{totalReviews} total reviews</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default AverageRating;
