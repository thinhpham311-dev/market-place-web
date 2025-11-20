"use client";

import React from "react";
import { Button } from "@/components/ui";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { ISkuPro } from "@/interfaces/sku";
import { ISpuPro } from "@/interfaces/spu";
import { ICartItem } from "@/interfaces/cart";


interface BuyNowButtonProps {
    item: ICartItem;
    disabled?: boolean;
}

const BuyNowButton = ({ item, disabled }: BuyNowButtonProps) => {
    const { loading, error } = useShoppingCartContext();

    const handleBuyNow = () => {
        if (!item) return;
        // ✅ Có thể redirect sang checkout sau này
        console.log("Proceed to checkout:", { item });
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
