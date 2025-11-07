"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui";
import { formatToCurrency } from "@/lib/formats";

interface CartItemPriceProps {
    itemPrice?: number;

}

const CartItemPrice = ({
    itemPrice = 0,

}: CartItemPriceProps) => {
    return (

        <Tooltip>
            <TooltipTrigger className="line-clamp-1">
                <p className="text-sm font-medium text-center">
                    <strong> Price:</strong> {formatToCurrency(itemPrice)}
                </p>
            </TooltipTrigger>
            <TooltipContent>
                <strong> Price:</strong> {formatToCurrency(itemPrice)}
            </TooltipContent>
        </Tooltip>

    );
};

export default CartItemPrice;
