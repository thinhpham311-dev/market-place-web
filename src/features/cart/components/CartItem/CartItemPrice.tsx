"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui";

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
                    Price: ${itemPrice}
                </p>
            </TooltipTrigger>
            <TooltipContent>
                Price: ${itemPrice}
            </TooltipContent>
        </Tooltip>

    );
};

export default CartItemPrice;
