// src/components/product/review/ReviewDistribution/RatingDistributionList.tsx
import React from "react";
import RatingDistributionCard from "./RatingDistributionCard";
import { Review } from "../../types";

interface IRatingDistributionList {
  data: Review[];
}

const RatingDistributionList = ({ data }: IRatingDistributionList) => {
  const totalReviews = data.length;

  const ratingDistribution = Array(5).fill(0);
  data.forEach((review: Review) => {
    ratingDistribution[review.rating - 1]++;
  });
  ratingDistribution.reverse();

  return (
    <ul className="space-y-2">
      {ratingDistribution.map((count, index) => {
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        return (
          <li key={index}>
            <RatingDistributionCard star={5 - index} percentage={percentage} />
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(RatingDistributionList);
