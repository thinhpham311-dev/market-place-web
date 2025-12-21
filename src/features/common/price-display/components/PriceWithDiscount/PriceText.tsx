"use client";

import * as React from "react";
import { formatToCurrency } from "@/utils/formats"

interface IPriceTextProps {
    value: number;
    className?: string
}

const PriceText = ({ value, className = "" }: IPriceTextProps) => (
    <h3 className={`text-2xl font-bold text-blue-600 ${className}`}>
        {formatToCurrency(value)}
    </h3>
);

export default PriceText