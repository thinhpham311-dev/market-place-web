"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { ShoppingBag } from "lucide-react";

export default function MainCartHeader() {
    const { data } = useShoppingCartContext();
    const cartCount = data?.cart_count_product ?? 0;

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle className="text-lg uppercase flex items-center gap-2 ">
                    <ShoppingBag className="w-8 h-8" />
                    <span>
                        Cart <span className="font-normal">({cartCount})</span>
                    </span>
                </CardTitle>
            </CardHeader>
        </Card>
    );
}
