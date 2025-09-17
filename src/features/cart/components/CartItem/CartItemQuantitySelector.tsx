import React from 'react';
import { Card, CardContent, Counter } from '@/components/ui';
// import { useShoppingCartContext } from '../../hooks';

interface ICartItemQuantitySelectorProps {
    currentQuantity: number;
    maxQuantity: number
}

const CartItemQuantitySelector = ({ currentQuantity, maxQuantity }: ICartItemQuantitySelectorProps) => {
    // const { updateItem } = useShoppingCartContext()

    return (
        <Card className='border-none shadow-none'>
            <CardContent className='p-0'>
                <Counter
                    initialValue={currentQuantity}
                    maxValue={maxQuantity}
                // onQuantityChange={ }
                />
            </CardContent>
        </Card>
    );
};

export default CartItemQuantitySelector;