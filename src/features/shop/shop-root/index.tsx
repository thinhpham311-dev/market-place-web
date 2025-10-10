"use client"
import React from 'react';
import ShopInfoProvider from "../providers"
import ShopInfoWrapper from "../components/ShopInfoWrapper"
import ShopHeader from '../components/ShopHeader';
import ShopActions from '../components/ShopActions';
import ShopStats from '../components/ShopStats';
import { useFetchData } from '../hooks';

interface IShopProps {
    shop_id?: string;
    storeKey: string;
}

const ShopRoot = ({
    shop_id,
    storeKey
}: IShopProps) => {
    const shopData = useFetchData({
        shop_id,
        storeKey
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

export default ShopRoot;
