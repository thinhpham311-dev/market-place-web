"use client";
// src/components/ProductReview.tsx
import React from "react";
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import ReviewStars from "./ReviewStars";

type Review = {
  rating: number;
  comment: string;
  user: string;
};

interface ReviewListProps {
  data: Review;
}

const ReviewCard = ({ data: { rating, user, comment } }: ReviewListProps) => {
  return (
    <Card>
      <CardHeader className="p-0 flex-row items-center space-x-2 space-y-0">
        <ReviewStars data={rating} readOnly />
        <CardDescription className="text-sm text-gray-500">by {user}</CardDescription>
      </CardHeader>
      <hr />
      <CardContent className="p-3">
        <CardDescription className="mt-2 ">{comment}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
