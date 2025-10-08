"use client";
import React from "react";
import { CardHeader, Item } from "@/components/ui";
import ShopHeaderAvatar from "./ShopHeaderAvatar";
import ShopHeaderInfo from "./ShopHeaderInfo";
import ShopHeaderActions from "./ShopHeaderActions";

const ShopHeader = () => {
    return (
        <CardHeader className="p-3 w-full md:w-auto flex justify-center md:justify-start">
            <Item size="sm" className="p-0 flex items-center gap-3">
                <ShopHeaderAvatar />
                <ShopHeaderInfo />
                <ShopHeaderActions />
            </Item>
        </CardHeader>
    );
};

export default ShopHeader;
