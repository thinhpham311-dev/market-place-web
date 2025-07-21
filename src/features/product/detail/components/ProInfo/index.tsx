"use client";

import * as React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import ReviewStars from "@/features/reviews/components/ReviewStars"
import ProductPrice from "./ProductPrice"
import { Product } from "./types";


interface ISocialsShareProps {
    data: Product
}

export default function ProInfo({ data: { product_name, product_price, product_ratingsAverange } }: ISocialsShareProps) {
    return (
        <Card className="border-none shadow-none">
            <CardHeader className="p-3">
                <CardTitle className="flex items-center">{product_name}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
                <ReviewStars data={product_ratingsAverange} readOnly />
                <ProductPrice price={product_price} flashSalePrice={product_price - 1} />
            </CardContent>
        </Card>
    );
}

