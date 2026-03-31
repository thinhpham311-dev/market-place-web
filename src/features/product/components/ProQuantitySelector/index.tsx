"use client";

import { QuantitySelector } from "@/features/common";
import { PRO_DETAIL } from "@/features/product/constants";
import { useSkuContext } from "@/features/sku/hooks";
import { useSpuContext } from "@/features/spu/hooks";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useTranslation } from "@/lib/hooks/use-translation";

const ProQuantitySelector = () => {
  const { t } = useTranslation();
  const { sku } = useSkuContext();
  const { spu, loading: spuLoading, error: spuError } = useSpuContext();

  const hasNoData = !spu || Object.keys(spu).length === 0;
  const showLoading = spuLoading && hasNoData;
  const showError = !spuLoading && hasNoData && spuError;
  const showNotFound = !spuLoading && hasNoData && !spuError;

  if (showLoading) return <LoadingSkeleton />;
  if (showError) return <NotFound message={spuError || t("common_something_went_wrong")} />;
  if (showNotFound) return <NotFound message={t("common_no_data_found")} />;

  return (
    <QuantitySelector
      storeKey={`${PRO_DETAIL}_${sku?.sku_id ?? "default"}`}
      initialValue={{
        defaultCurrentQuantity: 1,
        maxQuantity: sku?.sku_stock,
      }}
      title={t("product_quantity")}
      layout="horizontal"
    />
  );
};

export default ProQuantitySelector;
