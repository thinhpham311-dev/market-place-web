"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui";

interface ProductPriceProps {
    price: number;
    flashSalePrice?: number; // Giá flash sale (nếu có)
    currency?: string; // Mặc định là "$"
}

export default function ProductPrice({ price, flashSalePrice, currency = "$" }: ProductPriceProps) {
    const hasFlashSale = flashSalePrice && flashSalePrice < price;
    const discountPercent = hasFlashSale
        ? Math.round(((price - flashSalePrice!) / price) * 100)
        : 0;

    return (
        <Card className="border-none shadow-none rounded-none bg-sidebar-primary-foreground" layout="horizontal">
            <CardContent className="p-3 flex flex-col gap-1">
                {hasFlashSale ? (
                    <>
                        <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-bold text-red-600">
                                {currency}{flashSalePrice}
                            </h3>
                            <span className="text-sm text-red-500 bg-red-100 px-2 py-0.5 rounded">
                                -{discountPercent}%
                            </span>
                        </div>
                        <p className="text-gray-500 line-through text-sm">
                            {currency}{price}
                        </p>
                    </>
                ) : (
                    <h3 className="text-2xl font-bold">{currency}{price}</h3>
                )}
            </CardContent>
        </Card>
    );
}
