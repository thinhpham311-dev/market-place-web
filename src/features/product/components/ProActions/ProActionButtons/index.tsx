"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui";
import { MdAddShoppingCart, MdShoppingCartCheckout } from "react-icons/md";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { mapCartItem } from "@/features/cart/helpers";

interface ProActionButtonsProps {
    sku: any;
    spu: any;
    itemQuantity: number;
    spuError?: string | null;
}

const ProActionButtons = ({ sku, spu, itemQuantity, spuError }: ProActionButtonsProps) => {
    const { addItem } = useShoppingCartContext();

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
        <>
            <Button {...buttonBaseProps} variant="outline">
                <MdAddShoppingCart />
                <span>Add to Cart</span>
            </Button>
            <Button {...buttonBaseProps} variant="default">
                <MdShoppingCartCheckout />
                <span>Buy Now</span>
            </Button>
        </>
    );
};

export default React.memo(ProActionButtons);
