"use client";

import React, { memo, useMemo, useCallback } from "react";
import { useStore } from "react-redux";

//hooks
import { useSkuContext } from "@/features/sku/hooks";
import { useSpuStore } from "@/features/spu/store/spuZustandStore";
import { useSkuStore } from "@/features/sku/store/skuZustandStore";

import CartAddItem from "@/features/cart/cart-add";

import { mapCartItem } from "@/features/cart/helpers";

//actions & selectors
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors";
import { QUANTITY_COUNTER } from "@/features/common/quantity-selector/constants";

///constants
import { PRO_DETAIL } from "@/features/product/constants";

//icons
import { MdAddShoppingCart } from "react-icons/md";
import { useTranslation } from "@/lib/hooks/use-translation";

const AddToCartButton = () => {
  const { t } = useTranslation();
  const store = useStore();

  const isOutOfStock = useSkuContext((state) => !state.sku || state.sku.sku_stock <= 0);

  const handleGetItem = useCallback(() => {
    const spu = useSpuStore.getState().spu;
    const sku = useSkuStore.getState().sku;
    if (!spu || !sku) return null;

    const state = store.getState();
    const qtyState = selectQuantitySelector(QUANTITY_COUNTER, `${PRO_DETAIL}_${sku.sku_id}`)(state);
    const qty = qtyState?.currentQuantity ?? 1;

    return mapCartItem({
      spu,
      sku,
      itemQuantity: qty,
    });
  }, [store]);

  const icon = useMemo(() => <MdAddShoppingCart />, []);

  console.log("AddToCartButton rendered");

  return (
    <CartAddItem
      size="lg"
      icon={icon}
      label={t("product_add_to_cart")}
      variant="secondary"
      getItem={handleGetItem}
      disabled={isOutOfStock}
    />
  );
};

export default memo(AddToCartButton);
