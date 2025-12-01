"use client"

import React from 'react';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface ICartItemProps {
    itemName: string
}

const CartItemName = ({
    itemName,
}: ICartItemProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <p
                    className="text-md font-bold text-center  w-[150px] truncate"
                >
                    {itemName}
                </p>
            </TooltipTrigger>

            <TooltipContent>
                {itemName}
            </TooltipContent>
        </Tooltip>
    );
};

export default CartItemName;
