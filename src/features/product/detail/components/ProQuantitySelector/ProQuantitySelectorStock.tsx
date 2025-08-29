"use client";

import React from "react";
import { CardDescription } from "@/components/ui";
import { useProQuantitySelectorContext } from "./hooks";

const ProQuantitySelectorStock: React.FC = () => {
    const { maxQuantity } = useProQuantitySelectorContext();



    if (maxQuantity === 0) {
        return (
            <CardDescription className="transition-opacity duration-300">
                IN STOCK
            </CardDescription>
        );
    }

    return (
        <CardDescription className="transition-opacity duration-300">
            {`${maxQuantity} pieces available`}
        </CardDescription>
    );
};

export default React.memo(ProQuantitySelectorStock);
