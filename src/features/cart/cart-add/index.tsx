"use client";

import React, { memo } from "react";

import LoadingSkeleton from "./LoadingSkeleton";
import ErrorMsg from "./ErrorMsg";
import { useRouter } from "next/navigation";

import { useShoppingCartContext } from "@/features/cart/hooks";
import { ICartItemModel } from "@/models/cart";
import CartButtonBase from "@/features/cart/components/CartButtonBase";
import { ICartButtonBaseProps } from "@/features/cart/components/CartButtonBase";
import { renderVariantsText } from "@/features/cart/utils/renderVariants";
import { showSuccessToast } from "@/features/common/toast-msg";
import { useTranslation } from "@/lib/hooks/use-translation";

interface CartAddItemProps extends ICartButtonBaseProps {
  item?: ICartItemModel | null;
  getItem?: () => ICartItemModel | null;
  disabled?: boolean;
  href?: string;
}

const CartAddItem = ({ item, getItem, disabled, href = "", ...rest }: CartAddItemProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { createItem, loading, error } = useShoppingCartContext();

  const handleAddToCart = () => {
    const resolvedItem = getItem ? getItem() : item;
    if (!resolvedItem) return;
    createItem(resolvedItem);

    setTimeout(() => {
      const variantsText = renderVariantsText(
        resolvedItem.itemSpuVariations,
        resolvedItem.itemSkuTierIdx,
      );
      showSuccessToast({
        title: t("cart_add_success_title"),
        description: (
          <span className="text-white">
            {t("cart_add_success_desc")
              .replace("{product}", resolvedItem.itemSpuName)
              .replace("{variants}", variantsText || "-")
              .replace("{quantity}", String(resolvedItem.itemQuantity))}
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
