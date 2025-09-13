import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import CartItemImage from '@/features/cart/components/CartItem/CartItemImage';
import CartItemInfo from '@/features/cart/components/CartItem/CartItemInfo';
import CartItemActions from '@/features/cart/components/CartItem/CartItemActions';
import { ICartItem } from '@/interfaces/cart';

interface ICartItemProps {
    data: ICartItem
}

const CartItem = ({
    data
}: ICartItemProps) => {
    const { sku_id, product_image, product_name, sku_price, sku_stock, quantity } = data
    return (
        <Card className="grid md:grid-cols-10 grid-cols-12 grid-rows-2 gap-5 p-3">
            <CardHeader className="md:col-span-4 col-span-4 row-span-2 p-0 ">
                <CartItemImage
                    src={product_image ?? `https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png`}
                    alt="image not found"
                />
            </CardHeader>
            <CardContent className="md:col-span-6 col-span-8 row-span-1 p-0 space-y-3">
                <CardTitle className='text-md'>{product_name}</CardTitle>
                <CartItemInfo
                    itemPrice={sku_price}
                />
            </CardContent>
            <CardFooter className="md:col-span-6 col-span-8 p-0 row-span-1 space-x-3">
                <CartItemActions itemId={sku_id} itemQuantity={quantity} itemStock={sku_stock} />
            </CardFooter>
        </Card>

    );
};

export default CartItem;