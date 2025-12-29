"use client";

import React, { memo } from "react";

import LoadingSkeleton from "./LoadingSkeleton";
import ErrorMsg from "./ErrorMsg";
import { useRouter } from "next/navigation";

import { useShoppingCartContext } from "@/features/cart/hooks";
import { ICartItemModel } from "@/models/cart";
import CartButtonBase from "@/features/cart/components/CartButtonBase";
import { ICartButtonBaseProps } from "@/features/cart/components/CartButtonBase";
import { renderVariants } from "@/features/cart/utils/renderVariants";
import { showSuccessToast } from "@/features/common/toast-msg";

interface CartAddItemProps extends ICartButtonBaseProps {
  item?: ICartItemModel | null;
  disabled?: boolean;
  href?: string;
}

const CartAddItem = ({ item, disabled, href = "", ...rest }: CartAddItemProps) => {
  const router = useRouter();

  const { createItem, loading, error } = useShoppingCartContext();

  const handleAddToCart = () => {
    if (!item) return;
    createItem(item);

    setTimeout(() => {
      showSuccessToast({
        title: "Add To Successfully!",
        description: (
          <span className="text-white">
            The product {item.itemSpuName} -
            {renderVariants(item.itemSpuVariations, item.itemSkuTierIdx)} x {item.itemQuantity}
            has been added to your cart.
          </span>
        ),
      });
    }, 500);
    if (href) router.push(href);
  };

  if (error?.actions.createItem) {
    return <ErrorMsg />;
  }

  if (loading.actions.createItem) {
    return <LoadingSkeleton />;
  }

  return <CartButtonBase {...rest} disabled={disabled} onClick={handleAddToCart} />;
};

export default memo(CartAddItem);
