"use client";

import PriceWithDiscount from "./components/PriceWithDiscount";
import PriceRange from "./components/PriceRange";
import PriceDisplayProvider from "@/features/common/price-display/providers"
import { useHandlePriceDisplay } from "@/features/common/price-display/hooks"

interface IPriceDisplayProps {
    defaultPrice: number;
    currentPrice: number;
    flashSalePrice?: number;
    minPrice?: number;
    maxPrice?: number;
    storeKey: string;
    loading: boolean;
    error?: string | { message?: string } | null;

}

export default function PriceDisplay({
    storeKey,
    ...rest
}: IPriceDisplayProps) {
    const priceDisplay = useHandlePriceDisplay({
        storeKey,
        initialValue: rest
    })

    return <PriceDisplayProvider
        contextValues={{ ...priceDisplay }}
    >

        <PriceWithDiscount />
        <PriceRange />
    </PriceDisplayProvider>;
}
