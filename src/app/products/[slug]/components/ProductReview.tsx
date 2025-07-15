// src/components/ProductReview.tsx
import React from 'react';
import { injectReducer, RootState } from '@/store';
import { Button, Progress, Textarea, Card, CardHeader, CardContent, CardTitle, CardDescription, StarRating } from '@/components/ui';
import { addReview, setInitialReviews } from '@/store/product/detail/stateSlice';
import { OptionsListOfTab } from './OptionsListOfTab';
import { usePagination, usePaginationRender, useAppDispatch, useAppSelector } from "@/lib/hooks"
import reducer from '@/store/product/detail';

type Option = {
    label: string;
    value: string | Array<Option>
}


type Review = {
    rating: number;
    comment: string;
    user: string;
}

interface IReviewFormProps {
    onSubmit: (review: { rating: number; comment: string }) => void;
}

interface ReviewListProps {
    data: Review[];
    itemsPerPage?: number
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
const ReviewList = ({ data, itemsPerPage = 12 }: ReviewListProps) => {
    const [filter, setFilter] = React.useState<Option | null>(null); // Số sao được chọn (null = Tất cả)

    const { currentPage, totalPages, currentData, handlePageChange } = usePagination<Review>({
        data,
        itemsPerPage,
    });

    const filteredReviews = React.useMemo(() => {
        return filter === null
            ? currentData
            : currentData.filter((item) => item.rating === Number(filter.value));
    }, [currentData, filter]);

    const pagination = usePaginationRender({
        currentPage,
        totalPages,
        handlePageChange,
    });
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <OptionsListOfTab
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
                    onChange={(item) => setFilter(item?.value === "All" ? null : item)}
                    className="max-w-md"
                />
            </div>
            {filteredReviews?.length === 0 && <p>No reviews found for the selected rating.</p>}
            {filteredReviews?.map((item, index) => (
                <div key={index} className="p-4 border rounded-md">
                    <div className="flex items-center space-x-2">
                        <StarRating rating={item.rating} readOnly />
                        <span className="text-sm text-gray-500">by {item.user}</span>
                    </div>
                    <p className="mt-2 ">{item.comment}</p>
                </div>
            ))}
            <div className="flex items-center justify-center">{pagination}</div>
        </div>
    );
};


const ReviewStatistics = ({ data }: ReviewListProps) => {
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
        <Card className="md:p-5 p-3 space-y-6 sticky top-[70px]">
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
        <div className="p-0 grid md:grid-cols-3 grid-cols-1 gap-5 lg:col-span-3 md:col-span-3 col-span-1">
            <div className="md:col-span-2 col-span-1 space-y-5">
                <Card className="md:py-6 md:p-5 p-3 space-y-6">
                    <CardHeader className="p-0">
                        <CardTitle>Product Review</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-10">
                        <ReviewForm onSubmit={handleNewReview} />
                        <ReviewList data={reviews} />
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-1 my-0 relative">
                <ReviewStatistics data={reviews} />
            </div>
        </div>
    );
};

export default ProductReview;
