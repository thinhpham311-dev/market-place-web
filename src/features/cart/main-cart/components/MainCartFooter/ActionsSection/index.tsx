"use client";

import CheckoutButton from "./CheckoutButton";
import DeleteAllButton from "./DeleteAllButton";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { useTranslation } from "@/lib/hooks";
import { formatToCurrency } from "@/utils/formats";
import { Tag, Sparkles } from "lucide-react";

export default function ActionsSection() {
  const { t } = useTranslation();
  const { data } = useShoppingCartContext();

  const {
    cart_sub_total = 0,
    cart_total_discount = 0,
    cart_selected_items_count = 0,
    cart_selected_items_total = 0,
  } = data;

  const hasSelected = cart_selected_items_count > 0;
  const subTotal = hasSelected ? cart_selected_items_total : 0;

  // Calculate total item-level savings if items have original prices higher than current
  const selectedItemsList = hasSelected ? data.cart_selected_items : [];
  const itemLevelDiscount = (selectedItemsList || []).reduce((acc, item) => {
    if (item.itemOriginalPrice && item.itemOriginalPrice > item.itemSkuPrice) {
      return acc + (item.itemOriginalPrice - item.itemSkuPrice) * item.itemQuantity;
    }
    return acc;
  }, 0);

  const totalDiscount = (hasSelected ? cart_total_discount || 0 : 0) + itemLevelDiscount;
  const finalTotal = Math.max(0, subTotal - (hasSelected ? cart_total_discount || 0 : 0));

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border p-4 rounded-lg bg-card w-full shadow-sm">
      {/* Left Action & Selection Summary */}
      <div className="flex items-center gap-3">
        <DeleteAllButton />
        {hasSelected && (
          <span className="text-xs sm:text-sm font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
            {t("cart_selected_all")}: <strong className="text-foreground">{cart_selected_items_count}</strong> {t("cart_item_count")}
          </span>
        )}
      </div>

      {/* Right Pricing Breakdown & Checkout */}
      <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
        <div className="flex flex-col items-end text-right">
          {/* Subtotal line */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <span>{t("cart_subtotal")}:</span>
            <span className="font-semibold text-foreground">{formatToCurrency(subTotal)}</span>
          </div>

          {/* Discount line */}
          {totalDiscount > 0 ? (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <Tag className="w-3.5 h-3.5" />
              <span>{t("cart_discount")}:</span>
              <span>-{formatToCurrency(totalDiscount)}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[11px] text-emerald-600/80 dark:text-emerald-400/80">
              <Sparkles className="w-3 h-3" />
              <span>{t("cart_voucher_desc")}</span>
            </div>
          )}

          {/* Final Total line */}
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-sm font-semibold">{t("cart_total")}:</span>
            <span className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-500">
              {formatToCurrency(finalTotal)}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="shrink-0">
          <CheckoutButton />
        </div>
      </div>
    </div>
  );
}
