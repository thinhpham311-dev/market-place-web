"use client";
import * as React from "react";
import {
    Card,
    CardContent,
} from "@/components/ui";
import ReviewStars from "@/features/reviews/components/ReviewStars"


export default function ProDescriptionContent({ rating }: { rating?: number }) {

    return (
        <Card className="shadow-none border-none">
            <CardContent className="p-0">
                <ReviewStars readOnly data={rating} />
            </CardContent>
        </Card>
    );
}
