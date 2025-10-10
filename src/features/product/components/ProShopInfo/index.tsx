"use client";
import React from "react";
import ShopInfo from "@/features/shop/shop-info";
import { PRO_DETAIL } from "@/features/product/constants";
import { useProContext } from "@/features/product/hooks/useProContext";

const ProShopInfo = () => {
    const { shop_id } = useProContext()

    return (
        <ShopInfo
            storeKey={PRO_DETAIL}
            shop_id={shop_id}
        />
    );
};

export default ProShopInfo;
