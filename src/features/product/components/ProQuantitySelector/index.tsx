"use client";
import { useMemo } from "react";

import QuantitySelector from "@/features/common/quantity-selector";
import { PRO_DETAIL } from "@/features/product/constants";
import { useSkuContext } from "@/features/sku/hooks";
import { useSpuContext } from "@/features/spu/hooks";
import LoadingSkeleton from "./Loading";
import NotFound from "./NotFound";

const ProQuantitySelector = () => {
    const { sku, loading: skuLoading, error: skuError } = useSkuContext();
    const { spu, loading: spuLoading, error: spuError } = useSpuContext();

    const hasNoData = !spu || Object.keys(spu).length === 0;
    const showLoading = spuLoading && hasNoData;
    const showError = !spuLoading && hasNoData && spuError;
    const showNotFound = !spuLoading && hasNoData && !spuError;

    const isDisabled = useMemo(() => {
        const hasError = typeof skuError === "string" || !!skuError;
        return skuLoading || hasError;
    }, [skuLoading, skuError]);

    if (showLoading) return <LoadingSkeleton />;
    if (showError) return <NotFound message={spuError || "Something went wrong."} />;
    if (showNotFound) return <NotFound />;

    return (
        <QuantitySelector
            reducerKey={PRO_DETAIL}
            storeKey={`${PRO_DETAIL}_${sku?.sku_id ?? "default"}`}
            initialValue={{
                currentQuantity: 1
            }}
            title="Quantity"
            layout="horizontal"
            maxQuantity={sku?.sku_stock}
            isDisabled={isDisabled}
        />
    );
};

export default ProQuantitySelector;
