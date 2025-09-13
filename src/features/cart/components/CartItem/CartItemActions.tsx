import React from 'react';
import { Card, CardContent, Button } from '@/components/ui';
import CartItemQuantity from '@/features/cart/components/CartItem/CartItemQuantity';
import { MdClose } from "react-icons/md";
import { useShoppingCartContext } from '../../hooks';

interface ICartItemActionsProps {
    itemId: string;
    itemQuantity: number;
    itemStock: number
}

const CartItemActions = ({ itemId, itemQuantity, itemStock }: ICartItemActionsProps) => {
    const { removeItem } = useShoppingCartContext()
    const onHandleRemove = () => {
        removeItem(itemId)
        console.log('Remove item from cart');
    };

    return (
        <Card className='border-none shadow-none  w-full'>
            <CardContent className='p-0 flex items-center justify-between gap-2'>
                <CartItemQuantity currentQuantity={itemQuantity} maxQuantity={itemStock} />
                <Button variant="outline" size="icon" onClick={onHandleRemove}><MdClose /></Button>
            </CardContent>
        </Card>
    );
};

export default CartItemActions;