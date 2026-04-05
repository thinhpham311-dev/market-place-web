"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "./LoadingSkeleton";
import { ChevronRight } from "lucide-react";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { useTranslation } from "@/lib/hooks";

export default function MiniCartViewMoreButton() {
  const { t } = useTranslation();
  const { data, loading } = useShoppingCartContext();
  const { cart_items_count = 0 } = data;

  if (loading.actions.showList) {
    return <LoadingSkeleton />;
  }

  if (cart_items_count > 0) {
    return (
      <Button className="flex items-center gap-2" variant="ghost" size="sm" asChild>
        <Link href="/cart">
          <span>{t("see_more")}</span>
          <ChevronRight />
        </Link>
      </Button>
    );
  }
}
