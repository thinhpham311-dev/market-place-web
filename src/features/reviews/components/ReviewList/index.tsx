"use client"
// src/components/ProductReview.tsx
import React from 'react';
import { injectReducer } from '@/store';
import { StarRating } from '@/components/ui';
import { OptionsListOfTab } from '../OptionsListOfTab';
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


interface ReviewListProps {
    data: Review[];
    itemsPerPage?: number
}

injectReducer("productReview", reducer)


const ReviewList = ({ data }: ReviewListProps) => {
    const [filter, setFilter] = React.useState<Option | null>(null); // Số sao được chọn (null = Tất cả)

    const filteredReviews = React.useMemo(() => {
        return filter === null
            ? data
            : data.filter((item) => item.rating === Number(filter.value));
    }, [data, filter]);


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
        </div>
    );
};

export default ReviewList




