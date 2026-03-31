"use client";

import { Button } from "@/components/ui/button";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorMsg from "./ErrorMsg";
import { Trash } from "lucide-react";
import { useShoppingCartContext, useCartErrorHandler } from "@/features/cart/hooks";
import { useTranslation } from "@/lib/hooks";

function DeleteAllButton() {
  const { t } = useTranslation();
  const { data, loading, error, deleteItemsAll } = useShoppingCartContext();
  const { cart_items_count = 0 } = data;
  const showListError = error?.actions.showList;

  const { shouldRenderError } = useCartErrorHandler(showListError, "SHOW_LIST");

  if (shouldRenderError) {
    return <ErrorMsg />;
  }

  if (loading.actions.deleteItemsAll) {
    return <LoadingSkeleton />;
  }

  const isDisabled = cart_items_count === 0;

  return (
    <Button variant="destructive" size="sm" onClick={deleteItemsAll} disabled={isDisabled}>
      <Trash className="w-4 h-4" />
      <span>{t("cart_delete_all")}</span>
    </Button>
  );
}
export default DeleteAllButton;
