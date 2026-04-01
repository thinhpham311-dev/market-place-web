"use client";
import React from "react";
import Link from "next/link";
import { ItemHeader, Item } from "@/components/ui/item";
import ShopHeaderAvatar from "./ShopHeaderAvatar";
import ShopHeaderInfo from "./ShopHeaderInfo";
import { useShopInfoContext } from "@/features/shop/hooks";

const ShopHeader = () => {
  const { data } = useShopInfoContext();
  const { shop_id, shop_slug } = data || {};
  const shopHref = shop_id ? `/shop/${shop_slug || "shop"}-s.${shop_id}` : undefined;

  return (
    <ItemHeader className=" flex  basis-auto ">
      {shopHref ? (
        <Item size="sm" asChild className="p-0 flex items-center gap-3">
          <Link href={shopHref}>
            <ShopHeaderAvatar />
            <ShopHeaderInfo />
          </Link>
        </Item>
      ) : (
        <Item size="sm" className="p-0 flex items-center gap-3">
          <ShopHeaderAvatar />
          <ShopHeaderInfo />
        </Item>
      )}
    </ItemHeader>
  );
};

export default ShopHeader;
