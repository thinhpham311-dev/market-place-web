"use client";

import React, { useCallback, memo } from "react";
import { Card, CardContent, Button } from "@/components/ui";
import { ISpuPro } from "@/interfaces/spu";
import { ISkuPro } from "@/interfaces/sku";
import { ICartItem } from "@/interfaces/cart";
import { MdAddShoppingCart, MdShoppingCartCheckout } from "react-icons/md";
import { selectQuantitySelectorByStoreKey } from "@/features/product/components/ProQuantitySelector/store/selectors";
import { useAppSelector } from "@/lib/hooks";
import LoadingSkeleton from "./Loading";

interface IProActionsProps {
    storeKey: string;
    sku?: ISkuPro | null;
    spu?: ISpuPro;
    onAddToCart: (item: ICartItem) => void;
    loading: boolean;
    error: string | { message?: string } | null;
}


const ProActions = ({
    storeKey,
    sku,
    spu,
    onAddToCart,
    loading,
    error,
}: IProActionsProps) => {
    const { currentQuantity } = useAppSelector(
        selectQuantitySelectorByStoreKey(storeKey)
    );

    const handleAddToCart = useCallback(() => {
        if (!spu || !sku) return;
        onAddToCart({
            ...spu,
            ...sku,
            quantity: currentQuantity || 1,
            totalPrice: 0,
            discountedTotalPrice: 0,
        });
    }, [sku, spu, onAddToCart, currentQuantity]);

    const isDisabled = !sku || !!error;

    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <Card className="border-none shadow-none">
            <CardContent className="p-3 flex gap-3">
                <Button
                    size="lg"
                    variant="outline"
                    onClick={handleAddToCart}
                    disabled={isDisabled}
                >
                    <MdAddShoppingCart />
                    <span>Add to Cart</span>
                </Button>
                <Button
                    size="lg"
                    variant="default"
                    onClick={handleAddToCart}
                    disabled={isDisabled}
                >
                    <MdShoppingCartCheckout />
                    <span>Buy Now</span>
                </Button>
            </CardContent>
        </Card>
    );
};

export default memo(ProActions);
