"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui";

import PriceDisplay from "@/features/common/price-display";
import { PRO_DETAIL } from "@/features/product/constants";
import { useSkuContext } from "@/features/sku/hooks";
import { useSpuContext } from "@/features/spu/hooks";
import LoadingSkeleton from "./Loading";
import NotFound from "./NotFound";

export default function ProPriceDisplay() {
    const { sku, loading: skuLoading, error: skuError } = useSkuContext();
    const { spu, loading: spuLoading, error: spuError } = useSpuContext();

    const hasNoData = !spu || Object.keys(spu).length === 0;

    if (spuLoading && hasNoData) {
        return <LoadingSkeleton />;
    }

    if (!spuLoading && hasNoData && spuError) {
        return <NotFound message={spuError || "Something went wrong."} />;
    }

    if (!spuLoading && hasNoData) {
        return <NotFound />;
    }

    const defaultPrice = spu?.product_price ?? 0;
    const currentPrice = sku?.sku_price ?? defaultPrice;
    // const flashSalePrice = Math.min(defaultPrice, currentPrice)

    return (
        <Card className="border-none shadow-none rounded-none bg-sidebar-primary-foreground">
            <CardContent className="p-3 flex flex-col gap-1">
                <PriceDisplay
                    loading={skuLoading}
                    error={skuError}
                    storeKey={PRO_DETAIL}
                    defaultPrice={defaultPrice}
                    // flashSalePrice={flashSalePrice}
                    currentPrice={currentPrice}
                />
            </CardContent>
        </Card>
    );
}
