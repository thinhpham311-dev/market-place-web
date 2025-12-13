import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { MdClose } from "react-icons/md";
import { useShoppingCartContext } from '@/features/cart/hooks';
import { toast } from "sonner"
import { ICartItem } from '@/interfaces/cart';
import { renderVariants } from "@/features/cart/utils/renderVariants"

interface ICartItemRemoveProps {
    data: ICartItem
}

const CartItemRemove = ({ data }: ICartItemRemoveProps) => {
    const { itemSpuName, itemSpuVariations, itemSkuTierIdx, itemQuantity } = data;
    const { deleteItem } = useShoppingCartContext()
    const onHandleRemove = () => {
        deleteItem(data!);
        setTimeout(() => {
            const id = toast.success("Deleted Product Out Cart!", {
                description: <span className='text-white'>The product {itemSpuName} - {renderVariants(itemSpuVariations, itemSkuTierIdx)} x {itemQuantity} has been removed from your cart.</span>,
                action: {
                    label: "Close",
                    onClick: () => {
                        toast.dismiss(id);
                    },
                },
            });
        }, 500);
    };

    return (
        <div className='flex items-center justify-end'>
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

export default CartItemRemove;