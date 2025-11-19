import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui";

interface ICartItemQuantityViewProps {
    currentQuantity: number;
}

const CartItemQuantityView = ({ currentQuantity }: ICartItemQuantityViewProps) => {
    return (
        <Tooltip>
            <div className="line-clamp-1">
                <TooltipTrigger asChild>
                    <p className="text-sm font-medium text-center">
                        <strong>Qty:</strong> {currentQuantity}
                    </p>
                </TooltipTrigger>
                <TooltipContent>
                    <p>
                        <strong>Qty:</strong> {currentQuantity}
                    </p>
                </TooltipContent>
            </div>
        </Tooltip>
    );
};

export default CartItemQuantityView;
