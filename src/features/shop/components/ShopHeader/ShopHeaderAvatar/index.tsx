"use client";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ItemMedia } from "@/components/ui/item";

import { useShopInfoContext } from "@/features/shop/hooks";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";

const ShopHeaderAvatar = () => {
  const { data, loading, error } = useShopInfoContext();
  const { shop_name } = data || {};

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <ItemMedia>
      <Avatar className="w-16 h-16 md:w-20 md:h-20">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt={shop_name || "Shop Avatar"}
          width={80}
          height={80}
        />
        <AvatarFallback>{shop_name?.[0] || "S"}</AvatarFallback>
      </Avatar>
    </ItemMedia>
  );
};

export default ShopHeaderAvatar;
