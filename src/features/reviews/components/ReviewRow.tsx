"use client"
// src/components/ProductReview.tsx
import React from 'react';
import LoadingPlaceholder from "./LoadingSkeleton"
import { NotFound } from "@/components/layout"
import { Card, CardContent } from "@/components/ui"
import ReviewCard from './ReviewCard';
import { Review } from '../types';

interface ReviewListProps {
    data: Review[];
    isLoading?: boolean
}


const ReviewRow = ({ data, isLoading = false }: ReviewListProps) => {

    if (isLoading && (!data || data.length === 0)) {
        return <LoadingPlaceholder />;
    }

    if (!isLoading && (!data || data.length === 0)) {
        return <NotFound />;
    }

    return (
        <Card className='rounded-none'>
            <CardContent className='p-3 space-y-3'>
                {data?.map((_) => (
                    <ReviewCard key={_._id} data={_} />
                ))}
            </CardContent>
        </Card>
    );
};

export default ReviewRow




