"use client";

import React, { memo, useMemo } from "react";

//hooks
import { useSpuContext } from "@/features/spu/hooks";
import { useSkuContext } from "@/features/sku/hooks";
import { useAppSelector } from "@/lib/hooks";

import { ICartItem } from "@/interfaces/cart";
import CartAddItem from "@/features/cart/cart-add"

import { mapCartItem } from "@/features/cart/helpers";

//actions & selectors
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors";


///constants
import { PRO_DETAIL } from "@/features/product/constants";

//icons
import { MdAddShoppingCart } from "react-icons/md";

const AddToCartButton = () => {
    const { spu, loading: spuLoading, error: spuError } = useSpuContext();
    const { sku, loading: skuLoading, error: skuError } = useSkuContext();

    const { currentQuantity = 1 } = useAppSelector(
        selectQuantitySelector(PRO_DETAIL, `${PRO_DETAIL}_${sku?.sku_id}`)
    );

    const loading = spuLoading && skuLoading;

    const error = spuError && skuError;

    const data: ICartItem | null = useMemo(() => {
        if (!spu || !sku) return null;

        return mapCartItem({
            spu,
            sku,
            itemQuantity: currentQuantity,
        });

    }, [spu, sku, currentQuantity]);

    const isDisabled = !data || currentQuantity >= sku.sku_stock;

    return (
        <CartAddItem
            size="lg"
            icon={<MdAddShoppingCart />}
            label="Add To Cart"
            variant="secondary"
            item={data}
            isLoading={loading}
            isError={error}
            disabled={isDisabled}
        />
    );
};

export default memo(AddToCartButton);
