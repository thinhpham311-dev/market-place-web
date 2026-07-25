"use client";

import React, { memo, useMemo, useCallback } from "react";
import { useStore } from "react-redux";
import { useRouter } from "next/navigation";
import CartButtonBase from "@/features/cart/components/CartButtonBase";

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
  const router = useRouter();

  const isOutOfStock = useSkuContext((state) => !state.sku || state.sku.sku_stock <= 0);

  const handleBuyNow = useCallback(() => {
    const spu = useSpuStore.getState().spu;
    const sku = useSkuStore.getState().sku;
    if (!spu || !sku) return;

    const state = store.getState();
    const qtyState = selectQuantitySelector(QUANTITY_COUNTER, `${PRO_DETAIL}_${sku.sku_id}`)(state);
    const qty = qtyState?.currentQuantity ?? 1;

    const skuTierIdxParam = Array.isArray(sku.sku_tier_idx) ? sku.sku_tier_idx.join(",") : "";
    router.push(
      `/buy-now?product_id=${spu.product_id}&sku_tier_idx=${skuTierIdxParam}&qty=${qty}`
    );
  }, [store, router]);

  const icon = useMemo(() => <MdShoppingCartCheckout />, []);

  return (
    <CartButtonBase
      size="lg"
      icon={icon}
      label={t("product_buy_now")}
      disabled={isOutOfStock}
      onClick={handleBuyNow}
    />
  );
};

export default memo(BuyNowButton);

