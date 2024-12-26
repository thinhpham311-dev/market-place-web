import React, { useState, useMemo } from 'react';
import { Button, Textarea, Progress } from '@/components/ui/atoms';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/molecules';
import { ButtonTagsList, StarRating } from "@/components/ui/organisms"

interface Review {
    rating: number;
    comment: string;
    user: string;
}

interface ReviewFormProps {
    onSubmit: (review: { rating: number; comment: string }) => void;
}

interface ReviewListProps {
    reviews: Review[];
}

interface ReviewStatisticsProps {
    reviews: Review[];
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

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
const ReviewList = ({ reviews }: ReviewListProps) => {
    const [filter, setFilter] = useState<string | null>(null); // Số sao được chọn (null = Tất cả)

    const filteredReviews = useMemo(() => {
        return filter === null
            ? reviews
            : reviews.filter((review) => review.rating === Number(filter));
    }, [reviews, filter]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <ButtonTagsList
                    label="Filter by rating"
                    data={[{
                        label: "All",
                        value: "All"
                    },
                    {
                        label: "5 Sao",
                        value: "5"
                    },
                    {
                        label: "4 Sao",
                        value: "4"
                    },
                    {
                        label: "3 Sao",
                        value: "3"
                    },
                    {
                        label: "2 Sao",
                        value: "2"
                    },
                    {
                        label: "1 Sao",
                        value: "1"
                    }]}
                    onChange={(value) => setFilter(value === "All" ? null : value)}
                    className="max-w-md"
                />
            </div>
            {filteredReviews.length === 0 && <p>No reviews found for the selected rating.</p>}
            {filteredReviews.map((review, index) => (
                <div key={index} className="p-4 border rounded-md">
                    <div className="flex items-center space-x-2">
                        <StarRating rating={review.rating} readOnly />
                        <span className="text-sm text-gray-500">by {review.user}</span>
                    </div>
                    <p className="mt-2 text-gray-800">{review.comment}</p>
                </div>
            ))}
        </div>
    );
};


const ReviewStatistics = ({ reviews }: ReviewStatisticsProps) => {
    const totalReviews = reviews.length;

    const ratingDistribution = useMemo(() => {
        const distribution = Array(5).fill(0);
        reviews.forEach((review) => {
            distribution[review.rating - 1]++;
        });
        return distribution.reverse(); // Reverse the distribution to show higher ratings first
    }, [reviews]);

    const averageRating = useMemo(() => {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0.0';
    }, [reviews]);

    return (
        <Card className="p-5 space-y-6 sticky top-[70px]">
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

const ProductReview = ({ initialReviews, onSubmitReview }: { initialReviews: Review[]; onSubmitReview: (review: { rating: number; comment: string }) => void }) => {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);

    const handleNewReview = (review: { rating: number; comment: string }) => {
        const newReview = { ...review, user: 'Anonymous' }; // Replace with actual user data
        setReviews([newReview, ...reviews]);
        onSubmitReview(review);
    };

    return (
        <div className="p-0 grid md:grid-cols-3  grid-cols-1 gap-5 lg:col-span-3 md:col-span-3 col-span-1">
            <div className="md:col-span-2 col-span-1 space-y-5">
                <Card className="md:py-6 p-5 space-y-6 ">
                    <CardHeader className="p-0">
                        <CardTitle>Product Review</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-10">
                        <ReviewForm onSubmit={handleNewReview} />
                        <ReviewList reviews={reviews} />
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-1 my-0 relative">
                <ReviewStatistics reviews={reviews} />
            </div>
        </div>
    );
};

export default ProductReview;
