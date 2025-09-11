"use client";

import React from "react";
import { CardDescription } from "@/components/ui";
import { useQuantitySelectorContext } from "./hooks";

const QuantitySelectorStock: React.FC = () => {
    const { maxQuantity = 0 } = useQuantitySelectorContext();

    const message =
        maxQuantity === 0 ? "IN STOCK" : `${maxQuantity} pieces available`;

    return (
        <CardDescription className="transition-opacity duration-300 col-span-3">
            {message}
        </CardDescription>
    );
};

export default React.memo(QuantitySelectorStock);
