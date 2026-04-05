"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorMsg from "./ErrorMsg";
import { CreditCard } from "lucide-react";
import { useShoppingCartContext, useCartErrorHandler } from "@/features/cart/hooks";
import { useTranslation } from "@/lib/hooks";

function CheckoutButton() {
  const { t } = useTranslation();
  const { data, loading, error } = useShoppingCartContext();
  const { cart_items_count = 0 } = data;

  const showListError = error?.actions.showList;

  const { shouldRenderError } = useCartErrorHandler(showListError, "SHOW_LIST");

  if (shouldRenderError) {
    return <ErrorMsg />;
  }

  if (loading.actions.showList) {
    return <LoadingSkeleton />;
  }

  const isDisabled = cart_items_count === 0;

  return isDisabled ? (
    <Button size="sm" disabled>
      <CreditCard />
      <span>{t("cart_checkout")}</span>
    </Button>
  ) : (
    <Button size="sm" asChild>
      <Link href="/checkout">
        <CreditCard />
        <span>{t("cart_checkout")}</span>
      </Link>
    </Button>
  );
}

export default CheckoutButton;
