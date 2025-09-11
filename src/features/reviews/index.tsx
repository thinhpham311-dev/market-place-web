"use client"
// src/components/ProductReview.tsx
import React from 'react';
import { injectReducer } from '@/store';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui';
import ReviewForm from "./components/ReviewForm"
import ReviewRow from "./components/ReviewRow"
import ReviewDistribution from "./components/ReviewDistribution"
import reducer from './store';
import { setInitialReviews } from "./store/stateSlice"
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

injectReducer("productReview", reducer)


const ProductReview = () => {
    const dispatch = useAppDispatch()
    const { reviews } = useAppSelector(state => state.reviewForm.state)
    const { reviewsList } = useAppSelector(state => state.productReview.state)
    React.useEffect(() => {
        dispatch(setInitialReviews(reviews))
    }, [dispatch, reviews])


    return (
        <Card className=" border-none shadow-none">
            <CardContent>
                <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
                    <div className="md:col-span-2 col-span-1">
                        <Card className=" rounded-none">
                            <CardHeader >
                                <CardTitle>Product Review</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <ReviewForm />
                                <ReviewRow data={reviewsList} />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-span-1">
                        <ReviewDistribution data={reviewsList} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductReview;
