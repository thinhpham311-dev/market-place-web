"use client";

import React, { memo, useMemo } from "react";
import { ICartItem } from "@/interfaces/cart";
import CartBuyNow from "@/features/cart/cart-add"

import { mapCartItem } from "@/features/cart/helpers";

//actions & selectors
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors";


//hooks
import { useSpuContext } from "@/features/spu/hooks";
import { useSkuContext } from "@/features/sku/hooks";
import { useAppSelector } from "@/lib/hooks";


//constants
import { PRO_DETAIL } from "@/features/product/constants";

//icons
import { MdShoppingCartCheckout } from "react-icons/md";

const BuyNowButton = () => {
    const { spu, loading: spuLoading, error: spuError } = useSpuContext();
    const { sku, loading: skuLoading, error: skuError } = useSkuContext();

    const { currentQuantity } = useAppSelector(
        selectQuantitySelector(PRO_DETAIL, PRO_DETAIL)
    );

    const loading = spuLoading && skuLoading;

    const error = spuError && skuError;

    const data: ICartItem | null = useMemo(() => {
        if (!spu || !sku) return null;
        if (!currentQuantity) return null
        return mapCartItem({
            spu,
            sku,
            itemQuantity: currentQuantity,
        });
    }, [spu, sku, currentQuantity]);

    const isDisabled = !data || currentQuantity >= sku.sku_stock;

    return (
        <CartBuyNow
            href="/checkout"
            size="lg"
            icon={<MdShoppingCartCheckout />}
            label="Buy Now"
            item={data}
            isLoading={loading}
            isError={error}
            disabled={isDisabled}
        />
    );
};

export default memo(BuyNowButton);
