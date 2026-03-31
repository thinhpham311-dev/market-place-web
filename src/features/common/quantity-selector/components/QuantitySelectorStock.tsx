"use client";

import { memo } from "react";
import { CardDescription } from "@/components/ui/card";
import { useQuantitySelectorContext } from "@/features/common/quantity-selector/hooks";
import { useTranslation } from "@/lib/hooks/use-translation";

const QuantitySelectorStock = () => {
  const { t } = useTranslation();
  const { maxQuantity = 0 } = useQuantitySelectorContext();

  const message =
    maxQuantity === 0
      ? t("product_in_stock")
      : `${maxQuantity} ${t("product_pieces_available")}`;

  return (
    <CardDescription className="transition-opacity duration-300 basic-full">
      {message}
    </CardDescription>
  );
};

export default memo(QuantitySelectorStock);
