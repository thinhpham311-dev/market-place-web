"use client";

import React from "react";
import { Button } from "@/components/ui";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { ISkuPro } from "@/interfaces/sku";
import { ISpuPro } from "@/interfaces/spu";


interface BuyNowButtonProps {
    sku: ISkuPro | null;
    spu: ISpuPro | null;
    itemQuantity: number;
    disabled?: boolean;
}

const BuyNowButton = ({ sku, spu, itemQuantity, disabled }: BuyNowButtonProps) => {
    const { loading, error } = useShoppingCartContext();

    const handleBuyNow = () => {
        if (!sku || !spu) return;
        // ✅ Có thể redirect sang checkout sau này
        console.log("Proceed to checkout:", { sku, spu, itemQuantity });
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <NotFound />
        );
    }

    return (
        <Button
            size="lg"
            variant="default"
            onClick={handleBuyNow}
            disabled={disabled}
        >
            <MdShoppingCartCheckout />
            <span>Buy Now</span>
        </Button>
    );
};

export default React.memo(BuyNowButton);
