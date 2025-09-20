"use client";
import * as React from "react";
import {
    Card,
    CardContent,
} from "@/components/ui";
import ReviewStars from "@/features/reviews/components/ReviewStars"
import { useSpuContext } from "@/features/spu/hooks";
import LoadingSkeleton from "./Loading"
import NotFound from "./NotFound"

export default function ProDescriptionContent() {
    const { spu, loading, error } = useSpuContext();
    const hasNoData = !spu || Object.keys(spu).length === 0;
    if (loading && hasNoData) {
        return <LoadingSkeleton />;
    }

    if (!loading && hasNoData && error) {
        return <NotFound message={error || "Something went wrong."} />;
    }

    if (!loading && hasNoData) {
        return <NotFound />;
    }
    const rating = spu?.product_ratingsAverange ?? 0;

    return (
        <Card className="shadow-none border-none">
            <CardContent className="p-0">
                <ReviewStars readOnly data={rating} />
            </CardContent>
        </Card>
    );
}
