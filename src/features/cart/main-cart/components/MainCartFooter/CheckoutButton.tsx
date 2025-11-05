"use client";

import { Button } from "@/components/ui";
import { CreditCard } from "lucide-react";
import { formatToCurrency } from "@/lib/formats/formatToCurrency";
import { useShoppingCartContext } from "@/features/cart/hooks";

export function CheckoutButton() {
    const { data } = useShoppingCartContext();
    const total_price = data?.cart_total_price ?? 0;

    return (
        <Button size="sm">
            <CreditCard />
            <span>
                <strong>Check Out</strong> {formatToCurrency(total_price)}
            </span>
        </Button>
    );
}
