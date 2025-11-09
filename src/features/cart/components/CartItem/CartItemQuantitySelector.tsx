import React from 'react';
import {
    Counter,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui';
// import { useShoppingCartContext } from '../../hooks';

interface ICartItemQuantitySelectorProps {
    isView?: boolean;
    currentQuantity?: number;
    maxQuantity?: number;
}

const CartItemQuantitySelector = ({
    isView = false,
    currentQuantity = 0,
    maxQuantity,
}: ICartItemQuantitySelectorProps) => {
    // const { updateItem } = useShoppingCartContext()

    return (
        <>
            {isView ? (
                <Tooltip>
                    <div className=' line-clamp-1 '>
                        <TooltipTrigger asChild>
                            <p className="text-sm font-medium text-center">
                                <strong> Qty:</strong> {currentQuantity}
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                <strong> Qty:</strong> {currentQuantity}
                            </p>
                        </TooltipContent>
                    </div>
                </Tooltip>
            ) : (
                <Counter
                    initialValue={currentQuantity}
                    maxValue={maxQuantity}
                // onQuantityChange={(val) => updateItem(...)}
                />
            )}
        </>

    );
};

export default CartItemQuantitySelector;
