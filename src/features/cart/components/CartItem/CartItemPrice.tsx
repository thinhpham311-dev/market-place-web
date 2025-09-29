"use client";

import {
    Card, CardContent, CardDescription,
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
        <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
                <CardDescription>
                    <Tooltip>
                        <TooltipTrigger className="line-clamp-1">
                            Price: ${itemPrice}
                        </TooltipTrigger>
                        <TooltipContent>
                            Price: ${itemPrice}
                        </TooltipContent>
                    </Tooltip>
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default CartItemPrice;
