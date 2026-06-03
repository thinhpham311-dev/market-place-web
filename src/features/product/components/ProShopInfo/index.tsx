"use client";

import React, { memo } from "react";
import ShopInfo from "@/features/shop/shop-info";

interface IProShopInfoProps {
  shop_id: string;
}

const ProShopInfo = ({ shop_id }: IProShopInfoProps) => {
  return <ShopInfo shop_id={shop_id} />;
};

export default memo(ProShopInfo);
