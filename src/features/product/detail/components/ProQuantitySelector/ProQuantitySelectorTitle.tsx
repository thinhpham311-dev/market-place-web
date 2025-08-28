"use client";
import * as React from "react";

import {
    CardHeader,
    CardTitle,
} from "@/components/ui";

const ProQuantitySelectorTitle = () => {

    return (
        <CardHeader className="p-3 col-span-2">
            <CardTitle className="text-sm uppercase">
                quantity:
            </CardTitle>
        </CardHeader>
    );
}

export default ProQuantitySelectorTitle
