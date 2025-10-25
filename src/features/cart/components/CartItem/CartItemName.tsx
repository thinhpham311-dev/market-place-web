"use client"

import React from 'react';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui';


interface ICartItemProps {
    itemName: string
}

const CartItemName = ({
    itemName,
}: ICartItemProps) => {
    return (

        <Tooltip>
            <TooltipTrigger asChild className='inline-grid truncate'>
                <p className="text-md font-bold text-center">
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