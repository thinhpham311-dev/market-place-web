import React from 'react';
import { Card, CardContent, Counter } from '@/components/ui';

interface ICartItemQuantityProps {
    currentQuantity: number;
    maxQuantity: number
}

const CartItemQuantity = ({ currentQuantity, maxQuantity }: ICartItemQuantityProps) => {
    return (
        <Card className='border-none shadow-none'>
            <CardContent className='p-0'>
                <Counter initialValue={currentQuantity} maxValue={maxQuantity} />
            </CardContent>
        </Card>
    );
};

export default CartItemQuantity;