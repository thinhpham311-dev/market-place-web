"use client";

import { Button } from "@/components/ui";
import { MdAddShoppingCart } from "react-icons/md";
import { usePurchaseActions } from "./hooks"

import { IProduct } from "@/features/product/types";

interface Props {
    product: IProduct;
    quantityRef: any;
    optionsRef: any;
}

export default function AddToCartButton({
    product,
    quantityRef,
    optionsRef,
}: Props) {
    const { handleAddToCart } = usePurchaseActions({
        product,
        quantityRef,
        optionsRef,
    });
    return (
        <Button
            onClick={handleAddToCart}
            variant="outline"
            size="sm"
            className="w-full md:w-auto uppercase"
        >
            <MdAddShoppingCart /> Add to cart
        </Button>
    );
}
