"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import CartItemName from "@/features/cart/components/CartItem/CartItemName";
import CartItemImage from "@/features/cart/components/CartItem/CartItemImage";
import CartItemPrice from "@/features/cart/components/CartItem/CartItemPrice";
import { CartItemVariantsView } from "@/features/cart/components/CartItem/CartItemVariantsSelector";
import { CartItemQuantityView } from "@/features/cart/components/CartItem/CartItemQuantitySelector";
import { ICartItemModel } from "@/models/cart";
import { useShoppingCartContext } from "@/features/cart/hooks";
import CartItemRemove from "./CartItemActions/CartItemRemove";
import { useTranslation } from "@/lib/hooks";
import LoadingSkeleton from "./LoadingSkeleton";
import CartItemGetVouchers from "./CartItemGetVouchers";

interface ICartItemProps {
  data: ICartItemModel;
}

const CartItem = ({ data }: ICartItemProps) => {
  const { t } = useTranslation();
  const { loading } = useShoppingCartContext();
  const {
    itemSkuId,
    itemSpuSlug,
    itemShopId,
    itemSpuId,
    itemSpuImage,
    itemSpuName,
    itemSpuVariations,
    itemSkuPrice,
    itemSkuTierIdx,
    itemQuantity,
  } = data;

  const isDeleting = loading.byItem[itemSkuId]?.deleteItem;
  const productHref = `/products/${itemSpuSlug}-i.${itemShopId}.${itemSpuId}`;

  if (isDeleting) {
    return <LoadingSkeleton />;
  }

  return (
    <Card className="flex flex-col w-full overflow-hidden border shadow-sm">
      <div className="flex flex-row items-start p-2.5 gap-2.5 w-full">
        {/* Column 1: Product Image */}
        <CardHeader className="w-16 h-16 shrink-0 p-0">
          <Link href={productHref} className="block cursor-pointer">
            <CartItemImage
              className="aspect-square h-full w-full object-cover rounded-md"
              src={itemSpuImage}
              imgClassName="h-full w-full"
              alt="image not found"
            />
          </Link>
        </CardHeader>

        {/* Column 2: Main Info (Name, Price, Quantity) */}
        <CardContent className="flex-1 p-0 min-w-0 space-y-1.5">
          <Link href={productHref} className="block cursor-pointer">
            <CartItemName itemName={itemSpuName} />
          </Link>

          <div className="flex items-center justify-between gap-2">
            <CartItemPrice label={`${t("cart_column_unit")}:`} itemPrice={itemSkuPrice} />
          </div>

          <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
            <CartItemQuantityView currentQuantity={itemQuantity} />
            <CartItemGetVouchers data={data} />
          </div>
        </CardContent>

        {/* Column 3: Delete Button positioned at top-right */}
        <div className="shrink-0 flex items-start justify-end pt-0.5">
          <CartItemRemove data={data} />
        </div>
      </div>

      {/* Full-width CardFooter at bottom */}
      <CardFooter className="w-full px-2.5 py-1.5 bg-slate-100/90 dark:bg-slate-800/60 border-t border-slate-200/80 dark:border-slate-700/60 flex flex-col items-stretch">
        <CartItemVariantsView itemVariants={itemSpuVariations} itemTierIdx={itemSkuTierIdx} />
      </CardFooter>
    </Card>
  );
};

export default React.memo(CartItem);
