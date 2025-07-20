"use client"
// src/components/ProductReview.tsx
import React from 'react';
import { injectReducer } from '@/store';
import { Button, Textarea, StarRating } from '@/components/ui';
import reducer from '@/store/product/detail';


interface IReviewFormProps {
    onSubmit: (review: { rating: number; comment: string }) => void;
}


injectReducer("productReview", reducer)

const ReviewForm = ({ onSubmit }: IReviewFormProps) => {
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState('');

    const handleSubmit = () => {
        if (rating === 0 || !comment.trim()) {
            alert('Please provide a rating and a comment.');
            return;
        }
        onSubmit({ rating, comment });
        setRating(0);
        setComment('');
    };

    return (
        <div className="space-y-4">
            <StarRating rating={rating} onRatingChange={setRating} />
            <Textarea
                placeholder="Write your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border rounded-md p-2"
            />
            <Button onClick={handleSubmit} variant="outline" className="w-full">
                Submit
            </Button>
        </div>
    );
};



export default ReviewForm;
