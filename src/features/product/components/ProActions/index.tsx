"use client";

import React, { useCallback, memo } from "react";
import { Card, CardContent, Button } from "@/components/ui";
import { MdAddShoppingCart, MdShoppingCartCheckout } from "react-icons/md";
import LoadingSkeleton from "./Loading";
import NotFound from "./NotFound";
import { useProContext } from "@/features/product/hooks/useProContext";
import { useSpuContext } from "@/features/spu/hooks";
import { useSkuContext } from "@/features/sku/hooks";
import { useShoppingCartContext } from "@/features/cart/hooks";

const ProActions = () => {
    const { currentQuantity } = useProContext();
    const { sku, loading: skuLoading } = useSkuContext();
    const { spu, loading: spuLoading, error: spuError } = useSpuContext();
    const { addItem } = useShoppingCartContext();

    const hasNoData = !spu || Object.keys(spu).length === 0;
    const isLoading = spuLoading || skuLoading;
    const hasError = !spuLoading && hasNoData && !!spuError;

    if (isLoading) return <LoadingSkeleton />;
    if (hasError) return <NotFound message={spuError || "Something went wrong."} />;
    if (!spuLoading && hasNoData) return <NotFound />;

    const handleAddToCart = useCallback(() => {
        if (!spu || !sku) return;
        addItem({
            itemId: sku.sku_id,
            itemName: spu.product_name,
            itemImage: spu.product_image,
            itemSlug: spu.product_slug,
            itemPrice: Number(sku.sku_price),
            itemProductId: spu.product_id,
            itemShopId: spu?.product_shop.shop_id,
            itemShopName: spu?.product_shop.shop_name,
            itemShopSlug: spu?.product_shop.shop_slug,
            itemStock: sku.sku_stock,
            itemTierIdx: sku.sku_tier_idx,
            itemVariations: spu.product_variations,
            quantity: currentQuantity,
        });
    }, [sku, spu, addItem, currentQuantity]);

    const isDisabled = !sku || !!spuError || currentQuantity >= sku.sku_stock;

    const buttonBaseProps = {
        size: "lg" as const,
        onClick: handleAddToCart,
        disabled: isDisabled,
    };

    return (
        <Card className="border-none shadow-none">
            <CardContent className="p-3 flex gap-3">
                <Button {...buttonBaseProps} variant="outline">
                    <MdAddShoppingCart />
                    <span>Add to Cart</span>
                </Button>
                <Button {...buttonBaseProps} variant="default">
                    <MdShoppingCartCheckout />
                    <span>Buy Now</span>
                </Button>
            </CardContent>
        </Card>
    );
};

export default memo(ProActions);
