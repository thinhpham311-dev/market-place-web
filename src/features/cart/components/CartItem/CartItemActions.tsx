import React from 'react';
import {
    Card, CardContent,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui';
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
        <Card className='border-none shadow-none bg-transparent'>
            <CardContent className='p-0 flex justify-end'>
                <Tooltip>
                    <TooltipTrigger className='p-3' onClick={onHandleRemove}>
                        <MdClose />
                    </TooltipTrigger>
                    <TooltipContent>
                        remove product in shopping cart
                    </TooltipContent>
                </Tooltip>
            </CardContent>
        </Card>
    );
};

export default CartItemActions;