"use client";

import React from "react";
import { ItemActions } from "@/components/ui/item";
import { useShopInfoContext } from "@/features/shop/hooks";
import ShopFollowButton from "./ShopFollowButton";
import ShopViewButton from "./ShopViewButton";

const ShopActions = () => {
  const { data } = useShopInfoContext();
  const { shop_id, shop_slug } = data || {};

  const [isFollowing, setIsFollowing] = React.useState(false);
  const handleToggleFollow = () => setIsFollowing((prev) => !prev);

  return (
    <ItemActions className="flex-col gap-2">
      <ShopFollowButton isFollowing={isFollowing} onToggleFollow={handleToggleFollow} />
      <ShopViewButton slug={shop_slug} id={shop_id} />
    </ItemActions>
  );
};

export default ShopActions;
