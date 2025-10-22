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
import { mapCartItem } from "@/features/cart/helpers";

const ProActions = () => {
    const { itemQuantity } = useProContext();
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
        addItem(mapCartItem({ sku, spu, itemQuantity }) as any);

    }, [sku, spu, addItem, itemQuantity]);


    const isDisabled = !sku || !!spuError || itemQuantity >= sku.sku_stock;

    const buttonBaseProps = {
        size: "lg" as const,
        onClick: handleAddToCart,
        disabled: isDisabled,
    };

    return (
        <Card className="border-none shadow-none lg:static md:fixed sm:fixed fixed bottom-0 left-0 z-50 w-full">
            <CardContent className="container mx-auto py-3 px-6 flex gap-3">
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
