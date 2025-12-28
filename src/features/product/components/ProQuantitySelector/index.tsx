"use client";

import { QuantitySelector } from "@/features/common";
import { PRO_DETAIL } from "@/features/product/constants";
import { useSkuContext } from "@/features/sku/hooks";
import { useSpuContext } from "@/features/spu/hooks";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";

const ProQuantitySelector = () => {
    const { sku } = useSkuContext();
    const { spu, loading: spuLoading, error: spuError } = useSpuContext();

    const hasNoData = !spu || Object.keys(spu).length === 0;
    const showLoading = spuLoading && hasNoData;
    const showError = !spuLoading && hasNoData && spuError;
    const showNotFound = !spuLoading && hasNoData && !spuError;

    if (showLoading) return <LoadingSkeleton />;
    if (showError) return <NotFound message={spuError || "Something went wrong."} />;
    if (showNotFound) return <NotFound />;

    return (
        <QuantitySelector
            storeKey={`${PRO_DETAIL}_${sku?.sku_id ?? "default"}`}
            initialValue={{
                currentQuantity: 1,
                maxQuantity: sku?.sku_stock
            }}
            title="Quantity"
            layout="horizontal"
        />
    );
};

export default ProQuantitySelector;
