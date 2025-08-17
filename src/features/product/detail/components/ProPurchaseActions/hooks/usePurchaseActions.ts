"use client";

import { useCallback, RefObject } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { useToast } from "@/lib/hooks";
import { useRouter } from "next/navigation";

import { addItem } from "@/features/cart/store/stateSlice";
import { Product } from "@/features/product/types";
import { IcartItem } from "@/interfaces/cart";

interface IProductItemQuantityRef {
    validateQuantity: () => string[];
    resetQuantity?: () => void;
    getCurrentQuantity?: () => number;
}

interface IProductItemOptionsListRef {
    validateOptions: () => string[];
    selectedOptions: (Option | null)[];
}

type Option = {
    label: string;
    value: string | Array<Option>;
};

interface IUsePurchaseActionsProps {
    product: Product;
    quantityRef: RefObject<IProductItemQuantityRef>;
    optionsRef: RefObject<IProductItemOptionsListRef>;
}

export function usePurchaseActions({
    product,
    quantityRef,
    optionsRef,
}: IUsePurchaseActionsProps) {
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const router = useRouter();

    // ✅ Validate product (dùng nội bộ hook)
    const validateProduct = useCallback((): string[] => {
        const optionErrors = optionsRef.current?.validateOptions?.() || [];
        const quantityErrors = quantityRef.current?.validateQuantity?.() || [];
        return [...optionErrors, ...quantityErrors];
    }, [optionsRef, quantityRef]);

    // ✅ Add to Cart
    const handleAddToCart = useCallback((): boolean => {
        const errors = validateProduct();
        if (errors.length > 0) {
            toast({
                title: "Error",
                description: `Please select a value for: ${errors.join(", ")}`,
                variant: "destructive",
            });
            return false;
        }

        const selectedOptions = optionsRef.current?.selectedOptions || [];
        const updatedQuantity = quantityRef.current?.getCurrentQuantity?.() || 0;

        if (updatedQuantity <= 0) {
            toast({
                title: "Error",
                description: "Please select a valid quantity",
                variant: "destructive",
            });
            return false;
        }

        const uniqueKey = `${product._id}-${selectedOptions
            .map((option) =>
                option ? `${option.label}-${option.value}` : ""
            )
            .join("|")}`;

        const cartItem: IcartItem = {
            _id: product._id,
            uniqueKey,
            product_name: product.product_name,
            product_price: product.product_price,
            product_slug: product.product_slug,
            quantity: updatedQuantity,
        };

        dispatch(addItem({ cartItem, options: selectedOptions }));
        quantityRef.current?.resetQuantity?.();

        return true;
    }, [product, validateProduct, dispatch]);

    // ✅ Buy Now (tái sử dụng Add to Cart)
    const handleBuyNow = useCallback(() => {
        const success = handleAddToCart();
        if (success) {
            router.push("/cart");
        }
    }, [handleAddToCart, router]);

    return {
        handleAddToCart,
        handleBuyNow,
    };
}
