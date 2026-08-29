"use client";

import { Button } from "@/components/ui/button";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorMsg from "./ErrorMsg";
import { Trash } from "lucide-react";
import { useShoppingCartContext, useCartErrorHandler } from "@/features/cart/hooks";
import { useTranslation } from "@/lib/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={isDisabled}>
          <Trash className="w-4 h-4" />
          <span>{t("cart_delete_all")}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("cart_delete_all_confirm_title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("cart_delete_all_confirm_desc")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common_cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={deleteItemsAll}
          >
            {t("cart_delete_all_confirm_button")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteAllButton;
