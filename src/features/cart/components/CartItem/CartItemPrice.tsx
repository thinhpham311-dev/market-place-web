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
        <Card className="border-none shadow-none">
            <CardContent className="p-0">
                <Tooltip>
                    <TooltipTrigger>
                        <CardDescription>
                            Price: ${itemPrice}
                        </CardDescription>
                    </TooltipTrigger>
                    <TooltipContent>
                        Price: ${itemPrice}
                    </TooltipContent>
                </Tooltip>
            </CardContent>
        </Card>
    );
};

export default CartItemPrice;
