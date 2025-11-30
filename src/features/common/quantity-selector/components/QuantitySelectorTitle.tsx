"use client";
import * as React from "react";

import {
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useQuantitySelectorContext } from "@/features/common/quantity-selector/hooks";


const QuantitySelectorTitle = () => {
    const { title } = useQuantitySelectorContext();

    if (!title) return null;


    return (
        <CardHeader className="p-3 min-w-[120px] max-w-[150px] flex-shrink-0 flex ">
            <CardTitle className="text-sm uppercase">
                {title}
            </CardTitle>
        </CardHeader>
    );
}

export default QuantitySelectorTitle
