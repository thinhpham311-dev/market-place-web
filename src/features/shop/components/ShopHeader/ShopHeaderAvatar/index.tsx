"use client";
import React from "react";
import { ItemMedia, Avatar, AvatarImage, AvatarFallback } from "@/components/ui";
import { useShopInfoContext } from "@/features/shop/hooks";
import LoadingSkeleton from "./Loading"
import NotFound from "./NotFound"

const ShopHeaderAvatar = () => {
    const { shopInfo, loading, error } = useShopInfoContext();
    const { shop_name } = shopInfo || {};

    if (loading) {
        return (
            <LoadingSkeleton />
        );
    }

    if (error) {
        return (
            <NotFound />
        );
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
