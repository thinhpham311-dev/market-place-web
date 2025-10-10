"use client";
import React from "react";
import { Item } from "@/components/ui";
import { cn } from "@/lib/utils";


const ShopInfoWrapper = ({ children }: { children: React.ReactNode }) => {

    return (
        <Item
            variant="outline"
            className="flex rounded-none items-center flex-row p-3"
        >
            {children}
        </Item>
    );
};

export default ShopInfoWrapper;
