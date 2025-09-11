import React from 'react';
import { Card, CardContent } from '@/components/ui';
import CartItemImage from '@/features/cart/components/CartItem/CartItemImage';
import CartItemInfo from '@/features/cart/components/CartItem/CartItemInfo';
import CartItemQuantity from '@/features/cart/components/CartItem/CartItemQuantity';
import CartItemActions from '@/features/cart/components/CartItem/CartItemActions';


const CartItem = () => {

    return (
        <Card>
            <CardContent className='p-3'>
                <CartItemImage src={`https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png`} alt="image not found" />
                <CartItemInfo
                    itemName="Product 01"
                    itemPrice={90}
                    itemQuantity={3} />
                <CartItemQuantity />
                <CartItemActions />
            </CardContent>
        </Card>
    );
};

export default CartItem;