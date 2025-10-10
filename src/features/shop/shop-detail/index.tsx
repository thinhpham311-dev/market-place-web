"use client"
import React from 'react';
import ShopInfoProvider from "../providers"
import ShopInfoWrapper from "../components/ShopInfoWrapper"
import ShopHeader from '../components/ShopHeader';
import ShopStats from '../components/ShopStats';
import ShopActions from '../components/ShopActions';
import { useFetchData } from '../hooks';
import { Card, CardContent } from "@/components/ui";

interface IShopProps {
    shop_id?: string;
    storeKey?: string;
}

const ShopDetail = ({
    shop_id,
    storeKey = "DEFAULT_SHOP"
}: IShopProps) => {
    const shopData = useFetchData({
        shop_id,
        storeKey
    })

    return (
        <Card className='grid grid-cols-12 border-none shadow-none'>
            <CardContent className='col-span-12'>
                <ShopInfoProvider contextValues={{ ...shopData }}>
                    <ShopInfoWrapper>
                        <ShopHeader />
                        <ShopActions />
                        <ShopStats />
                    </ShopInfoWrapper>
                </ShopInfoProvider>
            </CardContent>
        </Card>
    );
};

export default ShopDetail;
