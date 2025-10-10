"use client"
import React from 'react';
import ShopInfoProvider from "@/features/shop/providers"
import ShopInfoWrapper from "@/features/shop/components/ShopInfoWrapper"
import ShopHeader from '@/features/shop/components/ShopHeader';
import ShopActions from '@/features/shop/components/ShopActions';
import ShopStats from '@/features/shop/components/ShopStats';
import { useFetchData } from '@/features/shop/hooks';
import { SHOP_INFO } from "@/features/shop/shop-info/constants";

interface IShopProps {
    shop_id?: string;
}

const ShopInfo = ({
    shop_id
}: IShopProps) => {
    const shopData = useFetchData({
        shop_id,
        storeKey: SHOP_INFO
    })

    return (
        <ShopInfoProvider contextValues={{ ...shopData }}>
            <ShopInfoWrapper>
                <ShopHeader />
                <ShopActions />
                <ShopStats />
            </ShopInfoWrapper>
        </ShopInfoProvider>
    );
};

export default ShopInfo;
