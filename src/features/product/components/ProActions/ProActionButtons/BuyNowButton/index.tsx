"use client";

import React, { memo, useMemo } from "react";
import { ICartItemModel } from "@/models/cart";
import CartBuyNow from "@/features/cart/cart-add";

import { mapCartItem } from "@/features/cart/helpers";

//actions & selectors
import { useGetQuantityValue } from "@/features/common/quantity-selector/hooks/useGetQuantityValue";

//hooks
import { useSpuContext } from "@/features/spu/hooks";
import { useSkuContext } from "@/features/sku/hooks";

//constants
import { PRO_DETAIL } from "@/features/product/constants";

//icons
import { MdShoppingCartCheckout } from "react-icons/md";
import { useTranslation } from "@/lib/hooks/use-translation";

const spuSelector = (state: any) => state.spu;
const skuSelector = (state: any) => state.sku;

const BuyNowButton = () => {
  const { t } = useTranslation();
  const spu = useSpuContext(spuSelector);
  const sku = useSkuContext(skuSelector);

  const { currentQuantity: qty } = useGetQuantityValue({
    storeKey: `${PRO_DETAIL}_${sku?.sku_id}`,
  });

  const icon = useMemo(() => <MdShoppingCartCheckout />, []);

  const data: ICartItemModel | null = useMemo(() => {
    if (!spu || !sku) return null;
    if (!qty) return null;
    return mapCartItem({
      spu,
      sku,
      itemQuantity: qty,
    });
  }, [spu, sku, qty]);

  const isDisabled = !data || !sku || qty >= sku.sku_stock;

  return (
    <CartBuyNow
      href="/checkout"
      size="lg"
      icon={icon}
      label={t("product_buy_now")}
      item={data}
      disabled={isDisabled}
    />
  );
};

export default memo(BuyNowButton);
