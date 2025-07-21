// src/components/product/review/ReviewDistribution/RatingDistributionList.tsx
import React from "react";
import RatingDistributionCard from "./RatingDistributionCard";
import { Review } from "../../types";

interface IRatingDistributionList {
    data: Review[]
}



const RatingDistributionList = React.forwardRef(({ data }: IRatingDistributionList) => {
    const totalReviews = data.length;

    const ratingDistribution = React.useMemo(() => {
        const distribution = Array(5).fill(0);
        data.forEach((review: Review) => {
            distribution[review.rating - 1]++;
        });
        return distribution.reverse();
    }, [data]);

    return (
        <ul className="space-y-2">
            {ratingDistribution.map((count, index) => {
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                    <li>
                        <RatingDistributionCard
                            key={index}
                            star={5 - index}
                            percentage={percentage}
                        />
                    </li>
                );
            })}
        </ul>
    );
});

export default React.memo(RatingDistributionList);
