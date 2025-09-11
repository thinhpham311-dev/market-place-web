import React from 'react';
import { Card, CardContent } from '@/components/ui';
// import CartSummary from './CartSummary';

const CartContainer = () => {
    return (
        <Card>
            <CardContent className='p-3'>
                {/* <CartSummary items={[
                    { sku_id: "1", imageUrl: "", name: 'Product 1', price: 29.99, quantity: 2 },
                    { sku_id: "2", imageUrl: "", name: 'Product 2', price: 49.99, quantity: 1 },
                ]} /> */}
            </CardContent>
        </Card>
    );
};

export default CartContainer;
