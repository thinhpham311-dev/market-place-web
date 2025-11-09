"use client";

import React, { memo } from "react";
import { useProContext } from "@/features/product/hooks/useProContext";
import { useSpuContext } from "@/features/spu/hooks";
import { useSkuContext } from "@/features/sku/hooks";
import ProActionsWrapper from "./ProActionsWrapper";
import LoadingSkeleton from "./Loading";
import NotFound from "./NotFound";
import ProActionButtons from "./ProActionButtons";

const ProActions = () => {
    const { itemQuantity } = useProContext();
    const { sku, loading: skuLoading } = useSkuContext();
    const { spu, loading: spuLoading, error: spuError } = useSpuContext();

    const hasNoData = !spu || Object.keys(spu).length === 0;
    const isLoading = spuLoading || skuLoading;
    const hasError = !spuLoading && hasNoData && !!spuError;

    if (isLoading) return <LoadingSkeleton />;
    if (hasError) return <NotFound message={spuError || "Something went wrong."} />;
    if (!spuLoading && hasNoData) return <NotFound />;

    return (
        <ProActionsWrapper>
            <ProActionButtons sku={sku} spu={spu} itemQuantity={itemQuantity} spuError={spuError} />
        </ProActionsWrapper>
    );
};

export default memo(ProActions);
