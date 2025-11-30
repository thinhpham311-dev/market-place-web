"use client"
// src/components/ProductReview.tsx
import React from 'react';
import { injectReducer } from '@/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import ReviewStars, { ReviewStarsRef } from "../ReviewStars"
import ReviewComment, { ReviewCommentRef } from '../ReviewComment';
import reducer from './store';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addReview } from './store/stateSlice';
import { v4 as uuidv4 } from 'uuid';


injectReducer("reviewForm", reducer)

const ReviewForm = () => {
    const dispatch = useAppDispatch()
    const ratingRef = React.useRef<ReviewStarsRef>(null)
    const commentRef = React.useRef<ReviewCommentRef>(null)

    const { rating } = useAppSelector(state => state.reviewRating.state)
    const { text } = useAppSelector(state => state.reviewComment.state)

    const handleSubmit = React.useCallback(() => {
        if (rating === 0 || !text.trim()) {
            alert('Please provide a rating and a comment.');
            return;
        }
        dispatch(addReview({
            _id: uuidv4(),
            comment: text,
            rating
        }));

        ratingRef.current?.resetRating()
        commentRef.current?.clearComment()
    }, [dispatch, rating, text, ratingRef, commentRef])

    return (
        <Card className='rounded-none'>
            <CardContent className='p-3 space-y-3'>
                <ReviewStars ref={ratingRef} />
                <ReviewComment ref={commentRef} />
                <Button onClick={handleSubmit} variant="outline" className="w-full">
                    Submit
                </Button>
            </CardContent>
        </Card>
    );
};



export default ReviewForm;
