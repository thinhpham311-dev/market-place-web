"use client";
import React from "react";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";


const ShopInfoWrapper = ({ children }: { children: React.ReactNode }) => {

    return (
        <Card
            layout="horizontal"
            className={cn(
                "rounded-none items-center flex flex-col md:flex-row",
                "gap-3 md:gap-0"
            )}
        >
            {children}
        </Card>
    );
};

export default ShopInfoWrapper;
