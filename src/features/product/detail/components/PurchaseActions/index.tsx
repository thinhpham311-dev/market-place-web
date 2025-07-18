"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui";
import { injectReducer } from "@/store";
import reducer from "@/store/product/detail";

import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";

import { IProduct } from "@/features/product/types";

interface Props {
    product: IProduct;
}

injectReducer("purchaseActions", reducer);

export default function PurchaseActions({ product }: Props) {
    const productItemQuantityRef = useRef<any>(null);
    const productItemOptionListRef = useRef<any>(null);

    return (
        <Card layout="horizontal" className="grid lg:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-5 md:p-5 p-3">
            <CardContent className="lg:col-span-2 md:col-span-2 col-span-1 md:px-5 px-0">
                <div className="flex gap-2">
                    <AddToCartButton
                        product={product}
                        quantityRef={productItemQuantityRef}
                        optionsRef={productItemOptionListRef}
                    />
                    <BuyNowButton
                        product={product}
                        quantityRef={productItemQuantityRef}
                        optionsRef={productItemOptionListRef}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
