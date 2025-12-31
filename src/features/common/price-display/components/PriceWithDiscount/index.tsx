"use client";

import { useMemo } from "react";
import PriceText from "./PriceText";
import OldPrice from "./OldPrice";
import DiscountBadge from "./DiscountBadge";
import { usePriceDisplayContext } from "@/features/common/price-display/hooks";

const PriceWithDiscount = () => {
  const { defaultPrice, currentPrice, flashSalePrice } = usePriceDisplayContext();

  const { current, old, hasDiscount, discountPercent, isFlashSaleActive } = useMemo(() => {
    const hasFlashSale = flashSalePrice && flashSalePrice > 0 && flashSalePrice < currentPrice;

    const hasDefaultDiscount = !hasFlashSale && defaultPrice && defaultPrice > currentPrice;

    const current = hasFlashSale ? flashSalePrice : currentPrice;
    const old = hasFlashSale ? currentPrice : hasDefaultDiscount ? defaultPrice : undefined;

    let discountPercent = 0;

    if (hasFlashSale && currentPrice > 0) {
      discountPercent = Math.round(((currentPrice - flashSalePrice) / currentPrice) * 100);
    } else if (hasDefaultDiscount && defaultPrice) {
      discountPercent = Math.round(((defaultPrice - currentPrice) / defaultPrice) * 100);
    }

    return {
      current,
      old,
      discountPercent,
      hasDiscount: discountPercent > 0,
      isFlashSaleActive: !!hasFlashSale,
    };
  }, [defaultPrice, currentPrice, flashSalePrice]);

  return (
    <div className="price-with-discount">
      <div className="flex items-center gap-2">
        <PriceText value={current} className={hasDiscount ? "text-red-600 font-bold" : ""} />

        {old !== undefined && <OldPrice value={old} />}

        {hasDiscount && <DiscountBadge percent={discountPercent} isFlashSale={isFlashSaleActive} />}
      </div>

      {/* Flash sale timer (nếu cần hiển thị) */}
      {isFlashSaleActive && (
        <div className="flash-sale-timer mt-1 text-sm text-red-500">
          ⚡ Flash sale: Kết thúc sau 02:15:33
        </div>
      )}
    </div>
  );
};

export default PriceWithDiscount;
