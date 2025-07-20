"use client"
// src/components/ProductReview.tsx
import React from 'react';
import { injectReducer, RootState } from '@/store';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui';
import ReviewForm from "./components/ReviewForm"
import ReviewList from "./components/ReviewList"
import ReviewStatistics from "./components/ReviewStatistics"
import { addReview, setInitialReviews } from '@/store/product/detail/stateSlice';
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import reducer from '@/store/product/detail';


type Review = {
    rating: number;
    comment: string;
    user: string;
}

injectReducer("productReview", reducer)

const ProductReview = ({ initialReviews }: { initialReviews: Review[] }) => {
    const dispatch = useAppDispatch();
    const reviews = useAppSelector((state: RootState) => state.productReview.state.reviews);

    React.useEffect(() => {
        dispatch(setInitialReviews(initialReviews));
    }, [initialReviews, dispatch]);

    const handleNewReview = (review: { rating: number; comment: string }) => {
        dispatch(addReview(review));
    };

    return (
        <Card className=" border-none shadow-none">
            <CardContent>
                <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
                    <div className="md:col-span-2 col-span-1">
                        <Card className="space-y-6 rounded-none">
                            <CardHeader >
                                <CardTitle>Product Review</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-10">
                                <ReviewForm onSubmit={handleNewReview} />
                                <ReviewList data={reviews} />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-span-1">
                        <ReviewStatistics data={reviews} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductReview;
