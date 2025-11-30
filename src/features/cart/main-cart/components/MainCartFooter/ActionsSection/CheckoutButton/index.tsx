"use client";

import { Button } from "@/components/ui/button";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { CreditCard } from "lucide-react";
import { useShoppingCartContext } from "@/features/cart/hooks";

export function CheckoutButton() {
    const { data, loading, error } = useShoppingCartContext()
    const { cart_product_count = 0 } = data;

    if (loading) return <Loading />;
    if (error) return <NotFound />;

    const isDisabled = cart_product_count === 0;

    return (
        <Button size="sm" disabled={isDisabled}>
            <CreditCard />
            <span>Check Out</span>
        </Button>
    );
}
