"use client";

import { memo } from "react";
import { CardDescription } from "@/components/ui/card";
import { useQuantitySelectorContext } from "@/features/common/quantity-selector/hooks";

const QuantitySelectorStock = () => {
  const { maxQuantity = 0 } = useQuantitySelectorContext();

  const message = maxQuantity === 0 ? "IN STOCK" : `${maxQuantity} pieces available`;

  return (
    <CardDescription className="transition-opacity duration-300 basic-full">
      {message}
    </CardDescription>
  );
};

export default memo(QuantitySelectorStock);
