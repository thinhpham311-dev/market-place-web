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
    return (
        <ItemHeader className=" flex  basis-auto ">
            <Item size="sm" asChild className="p-0 flex items-center gap-3">
                <Link href={`/shop/${shop_slug}-s.${shop_id}`}>
                    <ShopHeaderAvatar />
                    <ShopHeaderInfo />
                </Link>
            </Item>
        </ItemHeader>
    );
};

export default ShopHeader;
