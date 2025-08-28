"use client";
import * as React from "react";

// ui
import {
    CardContent,
    CardDescription,
} from "@/components/ui";

// hooks
import { useProQuantitySelectorContext, useAnimatedNumber } from "./hooks";

const ProQuantitySelectorStock = () => {

    const {
        maxQuantity,
    } = useProQuantitySelectorContext();

    const displayQuantity = useAnimatedNumber(maxQuantity);

    const stockLabel = displayQuantity > 0
        ? `${displayQuantity} pieces available`
        : "IN STOCK";

    return (
        <CardDescription className="transition-opacity duration-300">
            {stockLabel}
        </CardDescription>
    );
};

export default ProQuantitySelectorStock
