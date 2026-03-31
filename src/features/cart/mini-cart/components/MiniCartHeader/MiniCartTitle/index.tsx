"use client";

import { ShoppingBag } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import LoadingSkeleton from "./LoadingSkeleton";
import { useTranslation } from "@/lib/hooks";
import { useShoppingCartContext } from "@/features/cart/hooks";

export default function MiniCartTitle() {
  const { t } = useTranslation();
  const { data, loading } = useShoppingCartContext();
  const { cart_items_count = 0 } = data;

  if (loading.actions.showList) {
    return <LoadingSkeleton />;
  }

  return (
    <CardTitle className="text-md space-x-1 uppercase">
      <ShoppingBag className="w-5 h-5 inline align-middle mr-1" />
      <span className="align-middle">
        {t("cart_title")} <span className="font-normal">({cart_items_count})</span>
      </span>
    </CardTitle>
  );
}
