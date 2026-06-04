"use client";

import React, { memo, useMemo, useCallback } from "react";
import { useStore } from "react-redux";
import CartBuyNow from "@/features/cart/cart-add";

import { mapCartItem } from "@/features/cart/helpers";

//actions & selectors
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors";
import { QUANTITY_COUNTER } from "@/features/common/quantity-selector/constants";

//hooks
import { useSkuContext } from "@/features/sku/hooks";
import { useSpuStore } from "@/features/spu/store/spuZustandStore";
import { useSkuStore } from "@/features/sku/store/skuZustandStore";

//constants
import { PRO_DETAIL } from "@/features/product/constants";

//icons
import { MdShoppingCartCheckout } from "react-icons/md";
import { useTranslation } from "@/lib/hooks/use-translation";

const BuyNowButton = () => {
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

  const icon = useMemo(() => <MdShoppingCartCheckout />, []);

  return (
    <CartBuyNow
      href="/checkout"
      size="lg"
      icon={icon}
      label={t("product_buy_now")}
      getItem={handleGetItem}
      disabled={isOutOfStock}
    />
  );
};

export default memo(BuyNowButton);
