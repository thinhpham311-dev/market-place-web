"use client"

import React from 'react';
import {
    Card, CardContent, CardTitle,
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
        <Card className="border-none shadow-none bg-transparent">
            <CardContent className=" p-0 ">
                <CardTitle
                    className="text-md cursor-pointer ">
                    <Tooltip>
                        <TooltipTrigger className='inline-grid truncate'>
                            {itemName}
                        </TooltipTrigger>
                        <TooltipContent>
                            {itemName}
                        </TooltipContent>
                    </Tooltip>
                </CardTitle>
            </CardContent>
        </Card>

    );
};

export default CartItemName;