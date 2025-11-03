"use client"

import React from 'react';
import {
    Card, CardContent, CardHeader
} from '@/components/ui';
import CartItemName from "@/features/cart/components/CartItem/CartItemName"
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
        itemSkuId,
        itemSpuSlug,
        itemShopId,
        itemSpuId,
        itemSpuImage,
        itemSpuName,
        itemSpuVariations,
        itemSkuPrice,
        itemSkuTierIdx,
        itemQuantity,
    } = data

    const handleRouterLinkToDetail = () => {
        router.push(`/products/${itemSpuSlug}-i.${itemShopId}.${itemSpuId}`)
    }

    return (
        <Card className="grid md:grid-cols-4 grid-cols-5 grid-rows-2 items-center p-1 gap-x-1">
            <CardHeader className="md:col-span-1 col-span-2 row-span-2 p-0 ">
                <div className='cursor-pointer' onClick={handleRouterLinkToDetail}>
                    <CartItemImage
                        _w={50}
                        _h={50}
                        src={itemSpuImage}
                        imgClassName="h-full w-full"
                        alt="image not found"
                    />
                </div>
            </CardHeader>
            <CardContent className="md:col-span-3 col-span-3 row-span-3 p-0 space-y-3 ">
                <div className="grid grid-cols-6 grid-rows-3 items-center">
                    {/* Tên item chiếm hết 5 cột */}
                    <div className="col-span-6">
                        <div onClick={handleRouterLinkToDetail} className='cursor-pointer'>
                            <CartItemName itemName={itemSpuName} />
                        </div>
                    </div>

                    {/* Giá: chiếm 3 cột */}
                    <div className="col-span-3 row-span-1">
                        <CartItemPrice itemPrice={itemSkuPrice} />
                    </div>

                    {/* Variants selector: chiếm 3 cột */}
                    <div className="col-span-3 row-span-1">
                        <CartItemVariantsSelector
                            itemVariants={itemSpuVariations}
                            itemTierIdx={itemSkuTierIdx}
                        />
                    </div>
                    <div className="col-span-2 row-span-2 row-end-4 col-start-4">
                        <CartItemQuantitySelector
                            isView={true}
                            currentQuantity={itemQuantity}
                        />
                    </div>

                    {/* Actions: chiếm 2 cột (ngang 2 hàng) */}
                    <div className="col-auto row-span-2 row-end-4 col-start-6">
                        <CartItemActions itemSkuId={itemSkuId} itemShopId={itemShopId} />
                    </div>
                </div>
            </CardContent>

        </Card>

    );
};

export default CartItem;