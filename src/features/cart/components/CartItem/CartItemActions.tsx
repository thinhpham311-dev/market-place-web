import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    Button
} from '@/components/ui';
import { MdClose } from "react-icons/md";
import { useShoppingCartContext } from '@/features/cart/hooks';

interface ICartItemActionsProps {
    itemSkuId: string;
    itemShopId: string;
}

const CartItemActions = ({ itemSkuId, itemShopId }: ICartItemActionsProps) => {
    const { removeItem } = useShoppingCartContext()
    const onHandleRemove = () => {
        removeItem(itemSkuId, itemShopId)
    };

    return (
        <div className='flex justify-end'>

            <Tooltip>
                <TooltipTrigger asChild className='p-3' >
                    <Button onClick={onHandleRemove} variant="link" size="icon">
                        <MdClose color="red" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    remove product in shopping cart
                </TooltipContent>
            </Tooltip>
        </div>

    );
};

export default CartItemActions;