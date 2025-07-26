"use client";

import React from "react";
import { Input } from "@/components/ui";

interface PriceInputProps {
    value: number;
    placeholder: string;
    onChange: (value: string) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value, placeholder, onChange }) => {
    return (
        <Input
            type="number"
            placeholder={placeholder}
            className="col-span-2"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            min={0}
        />
    );
};

export default PriceInput;
