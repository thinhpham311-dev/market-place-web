"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CartItemName from "@/features/cart/components/CartItem/CartItemName";
import CartItemImage from "@/features/cart/components/CartItem/CartItemImage";
import CartItemPrice from "@/features/cart/components/CartItem/CartItemPrice";
import { CartItemVariantsView } from "@/features/cart/components/CartItem/CartItemVariantsSelector";
import { CartItemQuantityView } from "@/features/cart/components/CartItem/CartItemQuantitySelector";
import { ICartItemModel } from "@/models/cart";
import { useShoppingCartContext } from "@/features/cart/hooks";
import CartItemRemove from "./CartItemActions/CartItemRemove";
import { useTranslation } from "@/lib/hooks";

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
    return (
      <Card className="grid grid-cols-5 grid-rows-2 items-center gap-x-1 p-3 md:grid-cols-4">
        <CardHeader className="col-span-2 row-span-2 p-0 md:col-span-1">
          <Skeleton className="h-[100px] w-[100px] rounded-md" />
        </CardHeader>
        <CardContent className="col-span-3 row-span-3 space-y-3 p-0 md:col-span-3">
          <div className="grid grid-cols-6 grid-rows-3 items-center gap-2">
            <Skeleton className="col-span-6 h-5 rounded-md" />
            <Skeleton className="col-span-3 h-4 rounded-md" />
            <Skeleton className="col-span-3 h-4 rounded-md" />
            <Skeleton className="col-span-2 col-start-4 row-span-2 row-end-4 h-9 rounded-md" />
            <Skeleton className="col-start-6 row-span-2 row-end-4 h-6 w-6 rounded-md justify-self-end" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="grid md:grid-cols-4 grid-cols-5 grid-rows-2 items-center p-1 gap-x-1">
      <CardHeader className="md:col-span-1 col-span-2 row-span-2 p-0 ">
        <Link href={productHref} className="block cursor-pointer">
          <CartItemImage
            _w={50}
            _h={50}
            src={itemSpuImage}
            imgClassName="h-full w-full"
            alt="image not found"
          />
        </Link>
      </CardHeader>
      <CardContent className="md:col-span-3 col-span-3 row-span-3 p-0 space-y-3 ">
        <div className="grid grid-cols-6 grid-rows-3 items-center">
          {/* Tên item chiếm hết 5 cột */}
          <div className="col-span-6">
            <Link href={productHref} className="block cursor-pointer">
              <CartItemName itemName={itemSpuName} />
            </Link>
          </div>

          {/* Giá: chiếm 3 cột */}
          <div className="col-span-3 row-span-1">
            <CartItemPrice label={`${t("cart_column_unit")}:`} itemPrice={itemSkuPrice} />
          </div>

          {/* Variants selector: chiếm 3 cột */}
          <div className="col-span-3 row-span-1">
            <CartItemVariantsView itemVariants={itemSpuVariations} itemTierIdx={itemSkuTierIdx} />
          </div>
          <div className="col-span-2 row-span-2 row-end-4 col-start-4">
            <CartItemQuantityView currentQuantity={itemQuantity} />
          </div>

          {/* Actions: chiếm 2 cột (ngang 2 hàng) */}
          <div className="col-auto row-span-2 row-end-4 col-start-6">
            <CartItemRemove data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
