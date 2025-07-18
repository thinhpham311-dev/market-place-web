"use client";

import { Button } from "@/components/ui";
import { usePurchaseActions } from "@/features/product/detail/hooks";

import { IProduct } from "@/features/product/types";

interface Props {
    product: IProduct;
    quantityRef: any;
    optionsRef: any;
}

export default function BuyNowButton({
    product,
    quantityRef,
    optionsRef,
}: Props) {

    const { handleBuyNow } = usePurchaseActions({
        product,
        quantityRef,
        optionsRef,
    });


    return (
        <Button
            onClick={handleBuyNow}
            size="sm"
            className="w-full md:w-auto uppercase"
        >
            Buy Now
        </Button>
    );
}
