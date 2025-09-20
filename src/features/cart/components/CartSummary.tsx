import React from 'react';
import { Card, CardContent, ScrollArea } from '@/components/ui';
import CartItem from "./CartItem"
import { useShoppingCartContext } from '../hooks';



const CartSummary = () => {
    const { cart } = useShoppingCartContext()
    const { items } = cart
    return (
        <Card className='border-none shadow-none '>
            <CardContent className='p-0'>
                <ScrollArea className="h-[300px]">
                    <ul className='space-y-3'>
                        {items.map(item => (
                            <li key={item.itemId}>
                                <CartItem data={item} />
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default CartSummary;
