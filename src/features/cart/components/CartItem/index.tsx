"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import CartItemImage from '@/features/cart/components/CartItem/CartItemImage';
import CartItemPrice from '@/features/cart/components/CartItem/CartItemPrice';
import CartItemVariantsSelector from "@/features/cart/components/CartItem/CartItemVariantsSelector"
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
        itemSlug,
        itemShopId,
        itemProductId,
        itemImage,
        itemName,
        itemVariations,
        itemPrice,
        itemTierIdx,
    } = data

    const handleRouterLinkToDetail = () => {
        router.push(`/products/${itemSlug}-i.${itemShopId}.${itemProductId}`)
    }


    return (
        <Card className="grid md:grid-cols-3 grid-cols-5 grid-rows-2 gap-3 p-3">
            <CardHeader className="md:col-span-1 col-span-2 row-span-4 p-0 ">
                <div className='cursor-pointer' onClick={handleRouterLinkToDetail}>
                    <CartItemImage
                        src={itemImage ?? `https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png`}
                        alt="image not found"
                    />
                </div>
            </CardHeader>
            <CardContent className="md:col-span-2 col-span-3 row-span-3 p-0 space-y-2">
                <CardTitle
                    onClick={handleRouterLinkToDetail}
                    className='text-md cursor-pointer'>
                    {itemName}
                </CardTitle>
                <CartItemPrice
                    itemPrice={itemPrice}
                />
                <CartItemVariantsSelector
                    itemVariants={itemVariations}
                    itemTierIdx={itemTierIdx}
                />
            </CardContent>
        </Card>

    );
};

export default CartItem;