// src/components/product/review/ReviewDistribution/RatingDistributionItem.tsx
import React from "react";
import { Card, CardContent, Progress } from "@/components/ui";

interface Props {
    star: number;
    percentage: number;
}

const RatingDistributionCard = ({ star, percentage }: Props) => {
    return (
        <Card className="rounded-none">
            <CardContent className="p-3">
                <div className="flex items-center justify-between">
                    <span>{star} Stars:</span>
                    <span>{Math.round(percentage)}%</span>
                </div>
                <Progress value={percentage} className="w-full h-2" />
            </CardContent>
        </Card>
    );
};

export default RatingDistributionCard;
