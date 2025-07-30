"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui";

import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";

import { Product } from "@/features/product/types";

interface Props {
    data: Product;
}


export default function PurchaseActions({ data }: Props) {
    const productItemQuantityRef = useRef<any>(null);
    const productItemOptionListRef = useRef<any>(null);

    return (
        <Card layout="horizontal" className="border-none shadow-none grid lg:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-5 w-full">
            <CardContent className="lg:col-span-2 md:col-span-2 col-span-1 p-3">
                <div className="flex gap-2">
                    <AddToCartButton
                        product={data}
                        quantityRef={productItemQuantityRef}
                        optionsRef={productItemOptionListRef}
                    />
                    <BuyNowButton
                        product={data}
                        quantityRef={productItemQuantityRef}
                        optionsRef={productItemOptionListRef}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
