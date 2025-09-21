import React from 'react';
import {
    Card, CardContent, Counter,
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
        <Card className="border-none shadow-none">
            <CardContent className="p-0">
                {isView ? (
                    <Tooltip>
                        <div className=' line-clamp-1 w-full'>
                            <TooltipTrigger asChild>
                                <p className="text-sm font-medium text-center">
                                    Qty: {currentQuantity} / {maxQuantity}
                                </p>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                    Qty: {currentQuantity} / {maxQuantity}
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
            </CardContent>
        </Card>
    );
};

export default CartItemQuantitySelector;
