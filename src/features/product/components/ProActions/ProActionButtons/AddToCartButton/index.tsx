"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { MdAddShoppingCart } from "react-icons/md";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { useSpuContext } from "@/features/spu/hooks";
import { useSkuContext } from "@/features/sku/hooks";
import { useAppSelector } from "@/lib/hooks";
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors"
import { PRO_DETAIL } from "@/features/product/constants"
import { ICartItem } from "@/interfaces/cart";
import { mapCartItem } from "@/features/cart/helpers";

interface AddToCartButtonProps {
    item: ICartItem
    disabled?: boolean;
}

const AddToCartButton = ({ item, disabled }: AddToCartButtonProps) => {
    const { addItem, loading, error } = useShoppingCartContext();

    const { spu, loading: spuLoading, error: spuError } = useSpuContext();
    const { sku, loading: skuLoading, error: skuError } = useSkuContext();
    const { itemQuantity } = useAppSelector(selectQuantitySelector(PRO_DETAIL, PRO_DETAIL))

    const handleAddToCart = () => {
        if (!item) return;
        addItem(item);
    };

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
