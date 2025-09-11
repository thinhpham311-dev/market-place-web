import React from 'react';
import { Card, CardContent } from '@/components/ui';


const CartItemQuantity = () => {
    return (
        <Card className='border-none shadow-none'>
            <CardContent className='p-0'>
                {/* <button onClick={onDecrease} disabled={quantity <= 0}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button> */}
            </CardContent>
        </Card>
    );
};

export default CartItemQuantity;