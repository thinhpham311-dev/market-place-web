"use client";

import { Box, MapPin, ShieldCheck, Truck } from "lucide-react";

import { useSpuContext } from "@/features/spu/hooks";
import { useTranslation } from "@/lib/hooks";
import { formatToCurrency } from "@/utils/formats";

import LoadingSkeleton from "./LoadingSkeleton";

function getEstimatedShipping(productPrice: number) {
  if (productPrice >= 500000) {
    return 0;
  }

  if (productPrice >= 200000) {
    return 15000;
  }

  return 30000;
}

export default function ProShippingInfo() {
  const { t } = useTranslation();
  const { spu, loading } = useSpuContext();
  const hasNoData = !spu || Object.keys(spu).length === 0;

  if (loading && hasNoData) {
    return <LoadingSkeleton />;
  }

  if (hasNoData) {
    return null;
  }

  const estimatedShipping = getEstimatedShipping(spu.product_price || 0);
  const shipFrom = spu.product_shop?.shop_name?.trim() || t("shop_name_fallback");

  return (
    <div className="my-4 space-y-3 rounded-2xl border border-stone-200/80 bg-stone-50/60 p-4">
      <div className="flex items-center gap-2">
        <Truck className="h-4 w-4 text-orange-600" />
        <h3 className="font-semibold">{t("product_shipping_title")}</h3>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
          <p>
            {t("product_shipping_from")}: <span className="font-medium text-foreground">{shipFrom}</span>
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Truck className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
          <p>
            {t("product_shipping_estimated_fee")}:{" "}
            <span className="font-medium text-foreground">
              {estimatedShipping === 0 ? t("product_shipping_free") : formatToCurrency(estimatedShipping)}
            </span>
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Box className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
          <p>
            {t("product_shipping_eta")}:{" "}
            <span className="font-medium text-foreground">{t("product_shipping_eta_value")}</span>
          </p>
        </div>

        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
          <p>
            {estimatedShipping === 0
              ? t("product_shipping_free_shipping_note")
              : t("product_shipping_standard_note")}
          </p>
        </div>
      </div>
    </div>
  );
}
