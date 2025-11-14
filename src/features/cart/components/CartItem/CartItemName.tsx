"use client"

import React from 'react';

import {
    Button,
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
                <Button variant="link" className="text-md font-bold text-center">
                    {itemName}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                {itemName}
            </TooltipContent>
        </Tooltip>


    );
};

export default CartItemName;