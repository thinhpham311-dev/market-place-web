"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorMsg from "./ErrorMsg";
import { CreditCard } from "lucide-react";
import { useShoppingCartContext, useCartErrorHandler } from "@/features/cart/hooks";
import { useTranslation } from "@/lib/hooks";

function CheckoutButton() {
  const { t } = useTranslation();
  const router = useRouter();
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

  return (
    <Button size="sm" disabled={isDisabled} onClick={() => router.push("/checkout")}>
      <CreditCard />
      <span>{t("cart_checkout")}</span>
    </Button>
  );
}

export default CheckoutButton;
