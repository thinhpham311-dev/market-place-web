"use client";

import * as React from "react";

interface IOldPriceProps {
    value: number;
    currency: string
}


const OldPrice = ({ value, currency }: IOldPriceProps) => (
    <p className="text-gray-500 line-through text-sm">
        {value.toLocaleString("vi-VN")} {currency}
    </p>
);

export default OldPrice