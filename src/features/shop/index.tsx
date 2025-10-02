import React from 'react';
import ShopInfoProvider from "./providers"
import { useFetchData } from './hooks';

interface IShopProps {
    children: React.ReactNode;
    shop_id?: string;
    storeKey: string;
}

const Shop = ({
    children,
    shop_id,
    storeKey
}: IShopProps) => {
    const shopData = useFetchData({
        shop_id,
        storeKey
    })

    return (
        <ShopInfoProvider contextValues={{ ...shopData }}>
            {children}
        </ShopInfoProvider>
    );
};

export default Shop;
