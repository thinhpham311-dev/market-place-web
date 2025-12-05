"use client";

import PriceWithDiscount from "./components/PriceWithDiscount";
import PriceRange from "./components/PriceRange";
import PriceDisplayProvider from "@/features/common/price-display/providers"
import { useHandlePriceDisplay } from "@/features/common/price-display/hooks"
import { IPriceDisplay } from "@/features/common/price-display/store/initial";

interface IPriceDisplayProps {
    reducerKey: string;
    storeKey: string;
    initialValue: IPriceDisplay;

}

export default function PriceDisplay({
    reducerKey,
    storeKey,
    initialValue
}: IPriceDisplayProps) {
    const priceDisplay = useHandlePriceDisplay({
        reducerKey,
        storeKey,
        initialValue
    })

    return <PriceDisplayProvider
        contextValues={{ ...priceDisplay }}
    >

        <PriceWithDiscount />
        <PriceRange />
    </PriceDisplayProvider>;
}
