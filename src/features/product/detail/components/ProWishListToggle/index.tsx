"use client";

import * as React from "react";
import { Card, CardTitle, CardContent, Label } from "@/components/ui";
import WishListButon from "./WishListButton"


export default function ProWishListToggle() {
    return (
        <Card layout="horizontal" className="border-none shadow-none items-center space-x-3">
            <CardContent className="p-0 flex flex-row items-center space-x-3">
                <WishListButon />
                <Label>
                    <span className="text-sm font-bold uppercase">WishList(18,8k)</span>
                </Label>
            </CardContent>
        </Card>
    );
}
