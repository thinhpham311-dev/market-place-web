import React from 'react';
import { Card, CardContent } from '@/components/ui';
import CartItem from "./CartItem"
import { useShoppingCartContext } from '../hooks';



const CartSummary = () => {
    const { cart } = useShoppingCartContext()
    const { items } = cart
    return (
        <Card className='border-none shadow-none '>
            <CardContent className='p-0'>
                <ul className='space-y-3'>
                    {items.map(item => (
                        <li key={item.sku_id}>
                            <CartItem data={item} />
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default CartSummary;
