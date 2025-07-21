"use client"
// src/components/ProductReview.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui';
import ReviewStars from "./ReviewStars"

type Review = {
    rating: number;
    comment: string;
    user: string;
}


interface ReviewListProps {
    data: Review;
}


const ReviewCard = ({ data: { rating, user, comment } }: ReviewListProps) => {

    return (
        <Card className="p-4 border rounded-none">
            <CardHeader className='p-0 flex-row items-center space-x-2'>
                <ReviewStars data={rating} readOnly />
                <CardDescription className="text-sm text-gray-500">by {user}</CardDescription>
            </CardHeader>
            <CardContent className='p-0'>
                <CardDescription className="mt-2 ">{comment}</CardDescription>
            </CardContent>
        </Card>
    );
};

export default ReviewCard




