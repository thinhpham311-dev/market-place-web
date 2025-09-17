"use client"

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import CartItemImage from '@/features/cart/components/CartItem/CartItemImage';
import CartItemPrice from '@/features/cart/components/CartItem/CartItemPrice';
import CartItemVariantsSelector from "@/features/cart/components/CartItem/CartItemVariantsSelector"
import CartItemQuantitySelector from '@/features/cart/components/CartItem/CartItemQuantitySelector';
import CartItemActions from '@/features/cart/components/CartItem/CartItemActions';
import { ICartItem } from '@/interfaces/cart';
import { useRouter } from "next/navigation"

interface ICartItemProps {
    data: ICartItem
}

const CartItem = ({
    data
}: ICartItemProps) => {
    const router = useRouter()
    const {
        product_id,
        product_slug,
        product_shop,
        product_image,
        product_name,
        product_variations,
        sku_id,
        sku_price,
        sku_stock,
        sku_tier_idx,
        quantity
    } = data

    const handleRouterLinkToDetail = () => {
        router.push(`/products/${product_slug}-i.${product_shop}.${product_id}`)
    }

    return (
        <Card className="grid md:grid-cols-12 grid-cols-12 grid-rows-2 gap-3 p-3">
            <CardHeader className="md:col-span-5 col-span-4 row-span-4 p-0 ">
                <div className='cursor-pointer' onClick={handleRouterLinkToDetail}>
                    <CartItemImage
                        src={product_image ?? `https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png`}
                        alt="image not found"
                    />
                </div>
            </CardHeader>
            <CardContent className="md:col-span-7 col-span-8 row-span-3 p-0 space-y-3">
                <CardTitle
                    onClick={handleRouterLinkToDetail}
                    className='text-md cursor-pointer'>
                    {product_name}
                </CardTitle>
                <CartItemPrice
                    itemPrice={sku_price}
                />
                <CartItemVariantsSelector
                    item={{ ...data }}
                    itemVariants={product_variations}
                    itemTierIdx={sku_tier_idx}
                />
            </CardContent>
            <CardFooter className="md:col-span-7 col-span-8 p-0 row-span-1 space-x-3 flex items-center justify-between">
                <CartItemQuantitySelector currentQuantity={quantity} maxQuantity={sku_stock} />
                <CartItemActions itemId={sku_id} />
            </CardFooter>
        </Card>

    );
};

export default CartItem;