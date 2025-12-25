"use client";

import { PriceDisplay } from "@/features/common";
import { PRO_DETAIL } from "@/features/product/constants";
import { useSkuContext } from "@/features/sku/hooks";
import LoadingSkeleton from "./LoadingSkeleton";

export default function SkuPriceDisplay({ spu }: { spu: any }) {
    const { sku, loading: skuLoading } = useSkuContext();

    const defaultPrice = spu?.product_price;
    const currentPrice = sku?.sku_price ?? defaultPrice;

    const hasNoData = !sku || Object.keys(sku).length === 0;


    if (skuLoading && hasNoData) {
        return <LoadingSkeleton />;
    }


    return (
        <PriceDisplay
            storeKey={`${PRO_DETAIL}_${sku?.sku_id ?? "default"}`}
            initialValue={{
                flashSalePrice: 0,
                maxPrice: 0,
                minPrice: 0,
                defaultPrice,
                currentPrice
            }}
        />
    );
}
