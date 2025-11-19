"use client";

import * as React from "react";

import OptionSelector from "@/features/common/option-selector"
import { PRO_DETAIL } from "@/features/product/constants";
import { useSpuContext } from "@/features/spu/hooks";
import { useSkuContext } from "@/features/sku/hooks";
import LoadingSkeleton from "./Loading"
import NotFound from "./NotFound"

const ProVariantsSelector = (() => {
    const { loading: skuLoading, error: skuError } = useSkuContext()
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
    const variants = spu?.product_variations ?? []

    return (
        <OptionSelector
            layout="horizontal"
            storeKey={PRO_DETAIL}
            initialValue={variants}
            loading={skuLoading}
            error={skuError}
        />
    );
});

export default ProVariantsSelector;
