"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatToCurrency } from "@/lib/formats";

interface CartItemPriceProps {
    label?: string
    itemPrice?: number;
}

const CartItemPrice = ({
    label = "",
    itemPrice = 0,
}: CartItemPriceProps) => {
    return (

        <Tooltip>
            <TooltipTrigger className="line-clamp-1">
                <p className="text-sm font-medium text-center">
                    <strong> {label}</strong> {formatToCurrency(itemPrice)}
                </p>
            </TooltipTrigger>
            <TooltipContent>
                <strong> Price:</strong> {formatToCurrency(itemPrice)}
            </TooltipContent>
        </Tooltip>

    );
};

export default CartItemPrice;
