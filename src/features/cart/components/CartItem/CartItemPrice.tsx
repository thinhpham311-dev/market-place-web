"use client";

import { Card, CardContent, CardDescription } from "@/components/ui";

interface CartItemPriceProps {
    itemPrice?: number;

}

const CartItemPrice = ({
    itemPrice = 0,

}: CartItemPriceProps) => {
    return (
        <Card className="border-none shadow-none">
            <CardContent className="p-0">
                <CardDescription>
                    Price: ${itemPrice}
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default CartItemPrice;
