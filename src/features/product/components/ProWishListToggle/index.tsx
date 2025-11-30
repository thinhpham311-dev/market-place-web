"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import WishListButon from "./WishListButton"


export default function ProWishListToggle() {
    return (
        <Card layout="horizontal" className="border-none shadow-none items-center space-x-3">
            <CardContent className="p-0 ">
                <Label htmlFor="wish-list" className="space-x-3 flex items-center">
                    <WishListButon />
                    <span className="text-sm font-bold uppercase">WishList(18,8k)</span>
                </Label>
            </CardContent>
        </Card>
    );
}
