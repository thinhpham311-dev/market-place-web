"use client";

import React from "react";
import { Button } from "@/components/ui";

interface PriceApplyButtonProps {
    onClick: () => void;
}

const PriceApplyButton: React.FC<PriceApplyButtonProps> = ({ onClick }) => {
    return (
        <Button className="col-span-5" size="sm" onClick={onClick}>
            Apply
        </Button>
    );
};

export default PriceApplyButton;
