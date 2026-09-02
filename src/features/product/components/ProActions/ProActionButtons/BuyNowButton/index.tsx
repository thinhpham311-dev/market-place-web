"use client";

import React, { memo, useMemo, useCallback } from "react";
import { useStore } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CartButtonBase from "@/features/cart/components/CartButtonBase";

//actions & selectors
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors";
import { QUANTITY_COUNTER } from "@/features/common/quantity-selector/constants";
import { selectOptionsSelector } from "@/features/common/option-selector/store/selectors";
import { setValidationErrors } from "@/features/common/option-selector/store/stateSlice";
import { OPTION_SELECTOR } from "@/features/common/option-selector/constants";

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

  const sku = useSkuContext((state) => state.sku);
  const isOutOfStock = Boolean(sku && sku.sku_stock <= 0);

  const handleBuyNow = useCallback(() => {
    const spu = useSpuStore.getState().spu;
    if (!spu) return;

    const variations = spu.product_variations ?? [];
    if (variations.length > 0) {
      const state = store.getState();
      const optionState = selectOptionsSelector(
        OPTION_SELECTOR,
        `${PRO_DETAIL}_${spu.product_id}`,
      )(state);
      const selectedOptions = optionState?.selectedOptions ?? [];

      const errors: Record<number, string> = {};
      const missingLabels: string[] = [];

      variations.forEach((v: any, idx: number) => {
        const selectedVal = selectedOptions[idx];
        if (selectedVal == null || typeof selectedVal !== "number" || selectedVal < 0) {
          const varName = v.label || v.name || `${t("product_variation")} ${idx + 1}`;
          errors[idx] = `${varName} is required.`;
          missingLabels.push(varName);
        }
      });

      if (missingLabels.length > 0) {
        store.dispatch(
          setValidationErrors({
            storeKey: `${PRO_DETAIL}_${spu.product_id}`,
            errors,
          }),
        );
        toast.error(t("product_select_variation_required"), {
          description: missingLabels.join(", "),
        });
        return;
      }
    }

    const currentSku = useSkuStore.getState().sku;
    if (!currentSku) {
      toast.error(t("product_select_variation_required"));
      return;
    }

    if (currentSku.sku_stock <= 0) {
      toast.error(t("product_out_of_stock"));
      return;
    }

    const state = store.getState();
    const qtyState =
      selectQuantitySelector(QUANTITY_COUNTER, `${PRO_DETAIL}_${spu.product_id}`)(state) ||
      selectQuantitySelector(QUANTITY_COUNTER, `${PRO_DETAIL}_${currentSku.sku_id}`)(state);
    const qty = qtyState?.currentQuantity ?? 1;

    const skuTierIdxParam = Array.isArray(currentSku.sku_tier_idx) ? currentSku.sku_tier_idx.join(",") : "";
    router.push(
      `/buy-now?product_id=${spu.product_id}&sku_tier_idx=${skuTierIdxParam}&qty=${qty}`,
    );
  }, [store, router, t]);

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

