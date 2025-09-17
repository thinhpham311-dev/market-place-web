"use client";

import * as React from "react";
import { formatToCurrency } from "@/lib/formats"

interface IOldPriceProps {
    value: number;
}


const OldPrice = ({ value }: IOldPriceProps) => (
    <p className="text-gray-500 line-through text-sm">
        {formatToCurrency(value)}
    </p>
);

export default OldPrice