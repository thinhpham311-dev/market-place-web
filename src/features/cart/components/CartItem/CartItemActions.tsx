import React from 'react';
import { Card, CardContent, Button } from '@/components/ui';

const CartItemActions = () => {
    const onHandleRemove = () => {
        console.log('Remove item from cart');
    };

    return (
        <Card>
            <CardContent className='p-3 flex items-center gap-2'>
                <Button variant="outline" onClick={onHandleRemove}>Remove</Button>
            </CardContent>
        </Card>
    );
};

export default CartItemActions;