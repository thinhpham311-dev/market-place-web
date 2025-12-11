"use client";

import React, { memo } from "react";
import { toast } from "sonner"

import LoadingSkeleton from "./Loading";
import NotFound from "./NotFound";
import { useRouter } from "next/navigation";

import { useShoppingCartContext } from "@/features/cart/hooks";
import { ICartItem } from "@/interfaces/cart";
import CartButtonBase from "@/features/cart/components/CartButtonBase";
import { ICartButtonBaseProps } from "@/features/cart/components/CartButtonBase"
import { renderVariants } from "@/features/cart/utils/renderVariants"

interface CartAddItemProps extends ICartButtonBaseProps {
    item?: ICartItem | null;
    isLoading: boolean;
    isError: string;
    disabled?: boolean;
    href?: string
}

const CartAddItem = ({ item, disabled, isLoading, isError, href = "", ...rest }: CartAddItemProps) => {
    const router = useRouter()

    const { createItem, loading, error } = useShoppingCartContext();

    const handleAddToCart = () => {
        if (!item) return;
        createItem(item);
        setTimeout(() => {
            const id = toast.success("Add To  Successfully!", {
                description: (
                    <span>
                        The product {item.itemSpuName} - (
                        {renderVariants(item.itemSpuVariations, item.itemSkuTierIdx)} x {item.itemQuantity}
                        ) has been added to your cart.
                    </span>
                ),
                action: {
                    label: "Close",
                    onClick: () => {
                        toast.dismiss(id);
                    },
                },
            });
        }, 500);
        if (href) router.push(href);
    };

    if (isLoading || loading) return <LoadingSkeleton />;
    if (isError || error) return <NotFound />;

    return (
        <CartButtonBase
            {...rest}
            disabled={disabled}
            onClick={handleAddToCart}
        />
    );
};

export default memo(CartAddItem);
