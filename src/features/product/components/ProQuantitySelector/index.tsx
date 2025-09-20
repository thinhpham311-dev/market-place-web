"use client";
import * as React from "react";

import QuantitySelector from "@/features/common/quantity-selector"
import { PRO_DETAIL } from "@/features/product/constants";
import { useSkuContext } from "@/features/sku/hooks";
import { useSpuContext } from "@/features/spu/hooks";
import LoadingSkeleton from "./Loading"
import NotFound from "./NotFound"

const ProQuantitySelector = () => {
    const { sku, loading: skuLoading, error: skuError } = useSkuContext()
    const { spu, loading: spuLoading, error: spuError } = useSpuContext()
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

    return (
        <QuantitySelector
            storeKey={PRO_DETAIL}
            initialValue={1}
            maxQuantity={sku?.sku_stock ?? 0}
            loading={skuLoading}
            error={skuError}
        />
    );
}

export default ProQuantitySelector
