"use client";

import React, { memo } from "react";
import { useSpuContext } from "@/features/spu/hooks";
import { useSkuContext } from "@/features/sku/hooks";
import ProActionsWrapper from "./ProActionsWrapper";
import LoadingSkeleton from "./Loading";
import NotFound from "./NotFound";
import AddToCartButton from "./ProActionButtons/AddToCartButton";
import BuyNowButton from "./ProActionButtons/BuyNowButton";
import { useAppSelector } from "@/lib/hooks";
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors"
import { PRO_DETAIL } from "@/features/product/constants"
import { ICartItem } from "@/interfaces/cart";
import { mapCartItem } from "@/features/cart/helpers";

const ProActions = () => {

    const { spu, loading: spuLoading, error: spuError } = useSpuContext();
    const { sku, loading: skuLoading, error: skuError } = useSkuContext();
    const { itemQuantity } = useAppSelector(selectQuantitySelector(PRO_DETAIL, PRO_DETAIL))
    const loading = spuLoading;
    const error = spuError;

    // Gom thành 1 object item
    const item: ICartItem = mapCartItem({
        spu,
        sku,
        itemQuantity
    })


    if (loading) return <LoadingSkeleton />;
    if (error) return <NotFound message={error} />;

    return (
        <ProActionsWrapper>
            <AddToCartButton item={item} />
            <BuyNowButton item={item} />
        </ProActionsWrapper>
    );
};

export default memo(ProActions);
