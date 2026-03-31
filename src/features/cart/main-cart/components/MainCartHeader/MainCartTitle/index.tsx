"use client";

import { ShoppingBag } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import LoadingSkeleton from "./LoadingSkeleton";
import { useTranslation } from "@/lib/hooks";
import { useShoppingCartContext } from "@/features/cart/hooks";

export default function MainCartTitle() {
  const { t } = useTranslation();
  const { data, loading } = useShoppingCartContext();

  const { cart_items_count = 0 } = data;

  if (loading.actions.showList) {
    return <LoadingSkeleton />;
  }

  return (
    <CardTitle className="text-lg space-x-1">
      <ShoppingBag className="w-6 h-6 inline align-middle mr-1" />
      <span className="align-middle uppercase">
        {t("cart_title")} <span className="font-normal">({cart_items_count})</span>
      </span>
    </CardTitle>
  );
}
