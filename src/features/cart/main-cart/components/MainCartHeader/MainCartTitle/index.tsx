"use client";

import { ShoppingBag } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useShoppingCartContext } from "@/features/cart/hooks";

export default function MainCartTitle() {
    const { data, loading, error } = useShoppingCartContext();
    const { cart_product_count = 0 } = data;

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
        <CardTitle className="text-lg space-x-1">
            <ShoppingBag className="w-6 h-6 inline align-middle mr-1" />
            <span className="align-middle uppercase">
                Cart <span className="font-normal">({cart_product_count})</span>
            </span>
        </CardTitle>
    );
}
