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
    currentQuantity,
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
                                Qty: {currentQuantity}
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                Qty: {currentQuantity}
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
