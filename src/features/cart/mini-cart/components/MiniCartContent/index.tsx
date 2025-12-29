"use client";

import CartListView from "@/features/cart/components/CartListView";
import { DropdownMenuItem, DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useShoppingCartContext, useCartErrorHandler } from "@/features/cart/hooks";
import ErrorMsg from "./ErrorMsg";
import LoadingSkeleton from "./LoadingSkeleton";

export default function MiniCartContent() {
  const { data, loading, error } = useShoppingCartContext();
  const { cart_items = [], cart_items_count = 0 } = data;
  const showListError = error?.actions.showList;

  const { shouldRenderError, errorMessage } = useCartErrorHandler(showListError, "SHOW_LIST");

  if (shouldRenderError) {
    return <ErrorMsg message={errorMessage} />;
  }

  if (loading.actions.showList) {
    return <LoadingSkeleton count={cart_items_count} />;
  }

  return (
    <DropdownMenuGroup>
      <DropdownMenuItem disabled>
        <CartListView data={cart_items} />
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
