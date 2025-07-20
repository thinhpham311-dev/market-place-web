"use client"
// src/components/ProductReview.tsx
import React from 'react';
import { injectReducer } from '@/store';
import { Progress, Card, CardHeader, CardContent, CardTitle, CardDescription, StarRating } from '@/components/ui';
import reducer from '@/store/product/detail';


type Review = {
    rating: number;
    comment: string;
    user: string;
}

interface IReviewListProps {
    data: Review[];
    itemsPerPage?: number
}

injectReducer("productReview", reducer)


const ReviewStatistics = ({ data }: IReviewListProps) => {
    const totalReviews = data?.length;

    const ratingDistribution = React.useMemo(() => {
        const distribution = Array(5).fill(0);
        data?.forEach((review) => {
            distribution[review.rating - 1]++;
        });
        return distribution.reverse(); // Reverse the distribution to show higher ratings first
    }, [data]);

    const averageRating = React.useMemo(() => {
        const totalRating = data?.reduce((sum, review) => sum + review.rating, 0);
        return totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0.0';
    }, [data]);

    return (
        <Card className="md:p-5 p-3 space-y-6 sticky top-0 rounded-none ">
            <CardHeader className="p-0">
                <CardTitle className="text-lg font-bold">Average Rating</CardTitle>
                <CardDescription>
                    <div className="flex items-center space-x-2">
                        <StarRating rating={Number(averageRating)} readOnly />
                        <span>{averageRating} / 5</span>
                    </div>
                    <p>{totalReviews} total reviews</p>
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <h3 className="text-lg font-bold">Rating Distribution</h3>
                <ul className="space-y-2">
                    {ratingDistribution.map((count, index) => {
                        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                        return (
                            <li key={index} className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <span>{5 - index} Stars:</span>
                                    <span>{Math.round(percentage)}%</span>
                                </div>
                                <Progress value={percentage} className="w-full h-2" />
                            </li>
                        );
                    })}
                </ul>
            </CardContent>
        </Card>
    );
};

export default ReviewStatistics;
