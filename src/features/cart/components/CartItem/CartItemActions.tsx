import React from 'react';
import { Card, CardContent, Button } from '@/components/ui';
import { MdClose } from "react-icons/md";
import { useShoppingCartContext } from '../../hooks';

interface ICartItemActionsProps {
    itemId: string;
}

const CartItemActions = ({ itemId }: ICartItemActionsProps) => {
    const { removeItem } = useShoppingCartContext()
    const onHandleRemove = () => {
        removeItem(itemId)
    };

    return (
        <Card className='border-none shadow-none'>
            <CardContent className='p-0'>
                <Button variant="outline" size="icon" onClick={onHandleRemove}><MdClose /></Button>
            </CardContent>
        </Card>
    );
};

export default CartItemActions;