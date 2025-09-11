"use client";

import * as React from "react";

interface IPriceTextProps {
    value: number;
    currency: string;
    className?: string
}

const PriceText = ({ value, currency, className = "" }: IPriceTextProps) => (
    <h3 className={`text-2xl font-bold text-blue-600 ${className}`}>
        {value.toLocaleString("vi-VN")} {currency}
    </h3>
);

export default PriceText