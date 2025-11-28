import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    Button
} from '@/components/ui';
import { MdClose } from "react-icons/md";
import { useShoppingCartContext } from '@/features/cart/hooks';
import { toast } from "sonner"
import { ICartItem } from '@/interfaces/cart';
import { renderVariants } from "@/features/cart/utils/renderVariants"

interface ICartItemRemoveProps {
    data: ICartItem
}

const CartItemRemove = ({ data }: ICartItemRemoveProps) => {
    const { itemId, itemSpuName, itemSpuVariations, itemSkuTierIdx, itemQuantity } = data;
    const { removeItem } = useShoppingCartContext()
    const onHandleRemove = () => {
        removeItem(itemId!);
        setTimeout(() => {
            const id = toast.success("Deleted Product Out Cart!", {
                description: <span>The product {itemSpuName} - ({renderVariants(itemSpuVariations, itemSkuTierIdx)} x {itemQuantity}) has been removed from your cart.</span>,
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