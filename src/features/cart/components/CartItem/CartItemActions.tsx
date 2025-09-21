import React from 'react';
import { Card, CardContent, Button } from '@/components/ui';
import { MdClose } from "react-icons/md";
import { useShoppingCartContext } from '@/features/cart/hooks';

interface ICartItemActionsProps {
    itemId: string;
}

const CartItemActions = ({ itemId }: ICartItemActionsProps) => {
    const { removeItem } = useShoppingCartContext()
    const onHandleRemove = () => {
        removeItem(itemId)
    };

    return (
        <Card className='border-none shadow-none h-full w-full'>
            <CardContent className='p-0 flex justify-end'>
                <Button variant="outline" size="icon" onClick={onHandleRemove}><MdClose /></Button>
            </CardContent>
        </Card>
    );
};

export default CartItemActions;