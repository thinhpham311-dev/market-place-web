import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui';
import CartItem from "./CartItem"
import { CartItem as CartItemType } from '@/features/cart/types';

interface CartSummaryProps {
    items: CartItemType[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Card>
            <CardContent className='p-3'>
                <ul>
                    {items.map(item => (
                        <li key={item.sku_id}>
                            <CartItem />
                        </li>
                    ))}
                </ul>
                <CardTitle>Total: ${totalAmount.toFixed(2)}</CardTitle>
            </CardContent>
        </Card>
    );
};

export default CartSummary;
