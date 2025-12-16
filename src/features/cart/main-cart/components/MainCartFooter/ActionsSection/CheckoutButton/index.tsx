"use client";

import { Button } from "@/components/ui/button";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorMsg from "./ErrorMsg";
import { CreditCard } from "lucide-react";
import { useShoppingCartContext, useCartErrorHandler } from "@/features/cart/hooks";

function CheckoutButton() {
    const { data, loading, error } = useShoppingCartContext()
    const { cart_product_count = 0 } = data;

    const showListError = error?.actions.showList;

    const { shouldRenderError } = useCartErrorHandler(showListError, "SHOW_LIST");

    if (shouldRenderError) {
        return <ErrorMsg />;
    }

    if (loading.actions.showList) {
        return <LoadingSkeleton />;
    }

    const isDisabled = cart_product_count === 0;

    return (
        <Button size="sm" disabled={isDisabled}>
            <CreditCard />
            <span>Check Out</span>
        </Button>
    );
}

export default CheckoutButton