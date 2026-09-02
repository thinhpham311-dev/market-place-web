"use client";

import React, { memo, useEffect } from "react";
import { QuantitySelector } from "@/features/common";
import { PRO_DETAIL } from "@/features/product/constants";
import { useSkuContext } from "@/features/sku/hooks";
import { selectSku } from "@/features/sku/store/skuZustandStore";
import { useSpuDetailData } from "@/features/spu/hooks";
import { useAppDispatch } from "@/lib/hooks";
import { setQuantity } from "@/features/common/quantity-selector/store/stateSlice";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useTranslation } from "@/lib/hooks/use-translation";

const ProQuantitySelector = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sku = useSkuContext(selectSku);
  const { spu, showLoading, showError, showNotFound, errorMessage } = useSpuDetailData();

  const skuId = sku?.sku_id;
  const productId = spu?.product_id;

  // Reset quantity to 1 whenever selected variant / SKU changes
  useEffect(() => {
    if (productId) {
      dispatch(
        setQuantity({
          key: `${PRO_DETAIL}_${productId}`,
          quantity: 1,
        }),
      );
    }
  }, [skuId, productId, dispatch]);

  if (showLoading) return <LoadingSkeleton />;
  if (showError) return <NotFound message={errorMessage} />;
  if (showNotFound) return <NotFound message={t("common_no_data_found")} />;

  return (
    <QuantitySelector
      storeKey={`${PRO_DETAIL}_${spu?.product_id ?? "default"}`}
      initialValue={{
        defaultCurrentQuantity: 1,
        maxQuantity: sku?.sku_stock ?? 0,
      }}
      title={t("product_quantity")}
      layout="horizontal"
    />
  );
};

export default memo(ProQuantitySelector);
