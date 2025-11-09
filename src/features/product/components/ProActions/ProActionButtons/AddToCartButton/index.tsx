"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { MdAddShoppingCart } from "react-icons/md";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { mapCartItem } from "@/features/cart/helpers";
import { ISkuPro } from "@/interfaces/sku";
import { ISpuPro } from "@/interfaces/spu";


interface AddToCartButtonProps {
    sku: ISkuPro | null;
    spu: ISpuPro | null;
    itemQuantity: number;
    disabled?: boolean;
}

const AddToCartButton = ({ sku, spu, itemQuantity, disabled }: AddToCartButtonProps) => {
    const { addItem, loading, error } = useShoppingCartContext();

    const handleAddToCart = useCallback(() => {
        if (!spu || !sku) return;
        addItem(mapCartItem({ sku, spu, itemQuantity }) as any);
    }, [sku, spu, addItem, itemQuantity]);

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <NotFound />
        );
    }

    return (
        <Button
            size="lg"
            variant="outline"
            onClick={handleAddToCart}
            disabled={disabled}
        >
            <MdAddShoppingCart />
            <span>Add to Cart</span>
        </Button>
    );
};

export default React.memo(AddToCartButton);
