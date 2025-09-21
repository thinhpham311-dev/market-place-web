"use client"

import React from 'react';
import {
    Card, CardContent, CardHeader, CardTitle,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui';
import CartItemImage from '@/features/cart/components/CartItem/CartItemImage';
import CartItemPrice from '@/features/cart/components/CartItem/CartItemPrice';
import CartItemVariantsSelector from "@/features/cart/components/CartItem/CartItemVariantsSelector"
import CartItemQuantitySelector from '@/features/cart/components/CartItem/CartItemQuantitySelector';
import { ICartItem } from '@/interfaces/cart';
import { useRouter } from "next/navigation"
import CartItemActions from './CartItemActions';

interface ICartItemProps {
    data: ICartItem
}

const CartItem = ({
    data
}: ICartItemProps) => {
    const router = useRouter()
    const {
        itemId,
        itemSlug,
        itemShopId,
        itemProductId,
        itemImage,
        itemName,
        itemVariations,
        itemPrice,
        itemTierIdx,
        quantity,
        itemStock
    } = data

    const handleRouterLinkToDetail = () => {
        router.push(`/products/${itemSlug}-i.${itemShopId}.${itemProductId}`)
    }


    return (
        <Card className="grid md:grid-cols-4 grid-cols-5 grid-rows-2 items-center p-1 gap-x-1">
            <CardHeader className="md:col-span-1 col-span-2 row-span-2 p-0 ">
                <div className='cursor-pointer' onClick={handleRouterLinkToDetail}>
                    <CartItemImage
                        src={itemImage ?? `https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png`}
                        alt="image not found"
                    />
                </div>
            </CardHeader>
            <CardContent className="md:col-span-3 col-span-3 row-span-3 p-0 space-y-2 ">
                <div className="grid grid-cols-6 grid-rows-3 items-center">
                    {/* Tên item chiếm hết 5 cột */}
                    <div className="col-span-6">
                        <Tooltip>
                            <TooltipTrigger>
                                <CardTitle
                                    onClick={handleRouterLinkToDetail}
                                    className="text-md cursor-pointer truncate">
                                    {itemName}
                                </CardTitle>
                            </TooltipTrigger>
                            <TooltipContent>
                                {itemName}
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    {/* Giá: chiếm 3 cột */}
                    <div className="col-span-3 row-span-1">
                        <CartItemPrice itemPrice={itemPrice} />
                    </div>

                    {/* Variants selector: chiếm 3 cột */}
                    <div className="col-span-3 row-span-1">
                        <CartItemVariantsSelector
                            itemVariants={itemVariations}
                            itemTierIdx={itemTierIdx}
                        />
                    </div>
                    <div className="col-span-2 row-span-2 row-end-4 col-start-4">
                        <CartItemQuantitySelector
                            isView={true}
                            currentQuantity={quantity}
                            maxQuantity={itemStock}
                        />
                    </div>

                    {/* Actions: chiếm 2 cột (ngang 2 hàng) */}
                    <div className="col-auto row-span-2 row-end-4 col-start-6">
                        <CartItemActions itemId={itemId} />
                    </div>
                </div>
            </CardContent>

        </Card>

    );
};

export default CartItem;