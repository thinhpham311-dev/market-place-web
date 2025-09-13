import React from 'react';
import { Card, CardContent, CardDescription } from "@/components/ui";


interface CartItemInfoProps {
    itemPrice: number;
}

const CartItemInfo = ({ itemPrice = 0 }: CartItemInfoProps) => {
    return (
        <Card className='border-none shadow-none'>
            <CardContent className='p-0'>
                <CardDescription>
                    <ul>
                        <li>Price: ${itemPrice}</li>
                    </ul>
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default CartItemInfo;
