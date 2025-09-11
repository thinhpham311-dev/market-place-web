import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui";

interface CartItemInfoProps {
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
}

const CartItemInfo: React.FC<CartItemInfoProps> = ({ itemName, itemPrice = 0, itemQuantity = 0 }) => {
    return (
        <Card className='border-none shadow-none'>
            <CardContent className='p-0'>
                <CardTitle>{itemName}</CardTitle>
                <CardDescription>
                    <ul>
                        <li>Price: ${itemPrice.toFixed(2)}</li>
                        <li>Quantity: {itemQuantity}</li>
                    </ul>
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default CartItemInfo;
