"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatToCurrency } from "@/utils/formats";

interface CartItemPriceProps {
  label?: string;
  itemPrice?: number;
  originalPrice?: number;
}

const CartItemPrice = ({ label = "", itemPrice = 0, originalPrice }: CartItemPriceProps) => {
  const hasDiscount = Boolean(originalPrice && originalPrice > itemPrice);
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice! - itemPrice) / originalPrice!) * 100)
    : 0;

  return (
    <Tooltip>
      <TooltipTrigger className="line-clamp-1">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <p className="text-sm font-bold text-red-600 dark:text-red-400">
              {label && <span className="font-normal text-muted-foreground">{label} </span>}
              {formatToCurrency(itemPrice)}
            </p>
            {hasDiscount && (
              <span className="bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                -{discountPercent}%
              </span>
            )}
          </div>
          {hasDiscount && (
            <p className="text-xs text-muted-foreground line-through">
              {formatToCurrency(originalPrice!)}
            </p>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-0.5">
          <p>
            <strong>{label || "Price"}:</strong> {formatToCurrency(itemPrice)}
          </p>
          {hasDiscount && (
            <p className="text-xs text-muted-foreground">
              Original: <span className="line-through">{formatToCurrency(originalPrice!)}</span> (-
              {discountPercent}%)
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default CartItemPrice;
