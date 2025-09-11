"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui";
import PriceWithDiscount from "./PriceWithDiscount";
import PriceRange from "./PriceRange";
import PriceText from "./PriceWithDiscount/PriceText";

interface IProFlashSalePriceProps {
    spu?: {
        defaultPrice?: number;
        minPrice?: number;
        maxPrice?: number;
        flashSaleMinPrice?: number;
        flashSaleMaxPrice?: number;
    };
    sku?: {
        price?: number;
        flashSalePrice?: number;
    };
    currency?: string;
    locale?: string;
}



export default function ProFlashSalePrice({
    spu,
    sku,
    currency = "₫",
}: IProFlashSalePriceProps) {
    const defaultPrice = spu?.defaultPrice ?? 0;
    const price = sku?.price ?? spu?.minPrice ?? 0;
    const flashSalePrice = sku?.flashSalePrice ?? 0;

    const hasSku = !!sku;
    const hasFlashSale = flashSalePrice > 0 && flashSalePrice < price;
    const hasDiscountFromDefault = !hasFlashSale && defaultPrice > price;

    const discountPercent = hasFlashSale
        ? Math.round(((price - flashSalePrice) / price) * 100)
        : hasDiscountFromDefault
            ? Math.round(((defaultPrice - price) / defaultPrice) * 100)
            : 0;

    return (
        <Card className="border-none shadow-none rounded-none bg-sidebar-primary-foreground" layout="horizontal">
            <CardContent className="p-3 flex flex-col gap-1">
                {hasSku ? (
                    hasFlashSale ? (
                        <PriceWithDiscount
                            current={flashSalePrice}
                            old={price}
                            currency={currency}
                            discountPercent={discountPercent}
                        />
                    ) : hasDiscountFromDefault ? (
                        <PriceWithDiscount
                            current={price}
                            old={defaultPrice}
                            currency={currency}
                            discountPercent={discountPercent}
                        />
                    ) : (
                        <PriceText value={price} currency={currency} />
                    )
                ) : spu?.flashSaleMinPrice && spu.flashSaleMaxPrice ? (
                    <PriceWithDiscount
                        current={spu.flashSaleMinPrice}
                        old={spu.minPrice}
                        currency={currency}
                        discountPercent={discountPercent}
                    />
                ) : (
                    <PriceRange
                        min={spu?.minPrice}
                        max={spu?.maxPrice}
                        currency={currency}
                    />
                )}
            </CardContent>
        </Card>
    );
}
